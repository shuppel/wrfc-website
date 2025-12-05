/**
 * Cherry Blossom Tournament Registration System
 * Google Apps Script for handling team registrations
 * 
 * Features:
 * - Receives registration submissions from website
 * - Stores data in Google Sheets
 * - Sends confirmation emails to teams
 * - Sends notification emails to admins
 * - Provides public JSON feed for website
 * - Manages waitlists when divisions fill up
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  SHEET_NAME_DATA: '2026',
  SHEET_NAME_CONFIG: 'Config',
  SHEET_NAME_SETTINGS: 'Settings',
  ADMIN_EMAIL: 'cbt-chair@washingtonrugby.org',
  FROM_EMAIL: 'cbt@washingtonrugby.org',
  PAYMENT_DEADLINE_DAYS: 14,
};

// ============================================
// MAIN ENDPOINTS
// ============================================

/**
 * HTTP GET - Returns public JSON feed of registered teams
 * Used by website to display current registrations
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'getTeams';
    
    if (action === 'getTeams') {
      const teams = getPublicTeamsData();
      return createJsonResponse({ status: 'success', data: teams });
    }
    
    if (action === 'getStats') {
      const stats = getDivisionStats();
      return createJsonResponse({ status: 'success', stats: stats });
    }
    
    return createJsonResponse({ status: 'error', message: 'Invalid action' });
    
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

/**
 * HTTP POST - Handles new registration submissions
 * Receives JSON data from website registration form
 */
function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    const validation = validateRegistrationData(data);
    if (!validation.valid) {
      return createJsonResponse({ 
        status: 'error', 
        message: validation.message 
      });
    }
    
    // Generate unique registration ID
    const regId = generateRegistrationId();
    
    // Calculate payment deadline
    const paymentDeadline = calculatePaymentDeadline();
    
    // Check if division has space
    const divisionCheck = checkDivisionAvailability(data.division);
    const status = divisionCheck.available ? 'pending' : 'waitlist';
    
    // Add to spreadsheet
    const result = addRegistrationToSheet(data, regId, paymentDeadline, status);
    
    if (!result.success) {
      throw new Error('Failed to add registration to sheet');
    }
    
    // Update division count
    updateDivisionCount(data.division, 1);
    
    // Send emails
    sendConfirmationEmail(data, regId, paymentDeadline, status);
    sendAdminNotification(data, regId, status);
    
    // Return success response
    return createJsonResponse({ 
      status: 'success',
      registrationId: regId,
      paymentDeadline: paymentDeadline,
      teamStatus: status,
      message: status === 'waitlist' 
        ? 'Your team has been added to the waitlist.' 
        : 'Registration received! Please complete payment within 14 days.'
    });
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createJsonResponse({ 
      status: 'error', 
      message: 'Registration failed: ' + error.toString() 
    });
  }
}

// ============================================
// DATA MANAGEMENT
// ============================================

/**
 * Add registration to the main data sheet
 */
function addRegistrationToSheet(data, regId, paymentDeadline, status) {
  try {
    const sheet = getSheet(CONFIG.SHEET_NAME_DATA);
    
    sheet.appendRow([
      new Date(),                    // A: Timestamp
      data.teamName,                 // B: Team Name
      data.division,                 // C: Division
      data.city,                     // D: City
      data.state,                    // E: State
      data.contactName,              // F: Contact Name
      data.email,                    // G: Email
      data.phone,                    // H: Phone
      data.playersCount || 'TBD',    // I: Players Count
      status,                        // J: Status (pending/waitlist/confirmed/cancelled)
      'unpaid',                      // K: Payment Status
      regId,                         // L: Registration ID
      data.notes || '',              // M: Notes
      paymentDeadline                // N: Payment Deadline
    ]);
    
    return { success: true };
  } catch (error) {
    Logger.log('Error adding to sheet: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Get public teams data (excludes sensitive info)
 */
function getPublicTeamsData() {
  const sheet = getSheet(CONFIG.SHEET_NAME_DATA);
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  const teams = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    // Only include non-cancelled teams
    if (row[9] !== 'cancelled') {
      teams.push({
        teamName: row[1],
        division: row[2],
        city: row[3],
        state: row[4],
        status: row[9],
        paymentStatus: row[10],
        registrationDate: row[0]
      });
    }
  }
  
  return teams;
}

/**
 * Get division statistics
 */
function getDivisionStats() {
  const sheet = getSheet(CONFIG.SHEET_NAME_CONFIG);
  const data = sheet.getDataRange().getValues();
  
  const stats = [];
  for (let i = 1; i < data.length; i++) {
    stats.push({
      division: data[i][0],
      fee: data[i][1],
      maxTeams: data[i][2],
      currentCount: data[i][3],
      format: data[i][4],
      status: data[i][5]
    });
  }
  
  return stats;
}

/**
 * Check if division has available spots
 */
function checkDivisionAvailability(divisionName) {
  const sheet = getSheet(CONFIG.SHEET_NAME_CONFIG);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === divisionName) {
      const maxTeams = data[i][2];
      const currentCount = data[i][3];
      return {
        available: currentCount < maxTeams,
        spotsRemaining: maxTeams - currentCount,
        isFull: currentCount >= maxTeams
      };
    }
  }
  
  return { available: true, spotsRemaining: 999, isFull: false };
}

/**
 * Update division count when team registers
 */
function updateDivisionCount(divisionName, increment) {
  const sheet = getSheet(CONFIG.SHEET_NAME_CONFIG);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === divisionName) {
      const currentCount = data[i][3];
      sheet.getRange(i + 1, 4).setValue(currentCount + increment);
      break;
    }
  }
}

// ============================================
// EMAIL FUNCTIONS
// ============================================

/**
 * Send confirmation email to team
 */
function sendConfirmationEmail(data, regId, paymentDeadline, status) {
  const isWaitlist = status === 'waitlist';
  const subject = isWaitlist 
    ? `CBT 2026 Waitlist - ${data.teamName}`
    : `CBT 2026 Registration Confirmation - ${data.teamName}`;
  
  const paymentLink = getSettingValue('Zeffy Payment Link') || 'https://www.zeffy.com/payment-link-placeholder';
  
  const body = isWaitlist 
    ? getWaitlistEmailBody(data, regId)
    : getConfirmationEmailBody(data, regId, paymentDeadline, paymentLink);
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body,
      name: 'Cherry Blossom Tournament'
    });
    Logger.log('Confirmation email sent to: ' + data.email);
  } catch (error) {
    Logger.log('Error sending confirmation email: ' + error.toString());
  }
}

/**
 * Send notification email to admin
 */
function sendAdminNotification(data, regId, status) {
  const subject = `New CBT Registration: ${data.teamName} (${status})`;
  
  const body = `
New team registration received for Cherry Blossom Tournament 2026

Registration Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Registration ID: ${regId}
Status: ${status.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEAM INFORMATION:
Team Name: ${data.teamName}
Division: ${data.division}
Location: ${data.city}, ${data.state}
Expected Players: ${data.playersCount || 'TBD'}

CONTACT INFORMATION:
Contact Name: ${data.contactName}
Email: ${data.email}
Phone: ${data.phone}

ADDITIONAL NOTES:
${data.notes || 'None'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
View in Google Sheets: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}

${status === 'waitlist' ? '⚠️  Division is full - team added to WAITLIST' : '✓ Team in pending status - awaiting payment'}
`;
  
  try {
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      body: body,
      name: 'CBT Registration System'
    });
    Logger.log('Admin notification sent');
  } catch (error) {
    Logger.log('Error sending admin notification: ' + error.toString());
  }
}

/**
 * Confirmation email body template
 */
function getConfirmationEmailBody(data, regId, paymentDeadline, paymentLink) {
  return `
Dear ${data.contactName},

Thank you for registering ${data.teamName} for the Cherry Blossom Tournament 2026!

REGISTRATION CONFIRMED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Registration ID: ${regId}
Team Name: ${data.teamName}
Division: ${data.division}
Location: ${data.city}, ${data.state}

NEXT STEPS - IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. COMPLETE PAYMENT by ${paymentDeadline}
   
   Payment Link: ${paymentLink}
   
   Your registration is NOT confirmed until payment is received.
   You have 14 days to complete payment.

2. PAYMENT CONFIRMATION
   
   Once payment is processed, you will receive a confirmation email
   with additional tournament details.

3. SAVE THIS EMAIL
   
   Your registration ID (${regId}) may be needed for future reference.

TOURNAMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date: April 25, 2026 (Date pending confirmation)
Location: Liberty Sports Park, Upper Marlboro, MD
Division: ${data.division}

More details will be shared as the tournament date approaches.

QUESTIONS?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email: cbt@washingtonrugby.org
Tournament Chair: cbt-chair@washingtonrugby.org
Website: https://washingtonrugby.org/tournaments/cherry-blossom

We look forward to seeing ${data.teamName} at CBT 2026!

Best regards,
Cherry Blossom Tournament Committee
Washington Rugby Football Club

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated message. Please do not reply to this email.
For questions, contact: cbt@washingtonrugby.org
`;
}

/**
 * Waitlist email body template
 */
function getWaitlistEmailBody(data, regId) {
  return `
Dear ${data.contactName},

Thank you for your interest in the Cherry Blossom Tournament 2026!

WAITLIST STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Registration ID: ${regId}
Team Name: ${data.teamName}
Division: ${data.division}
Location: ${data.city}, ${data.state}

The ${data.division} division is currently FULL. Your team has been added 
to our waitlist and you will be notified if a spot becomes available.

WHAT HAPPENS NEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• You will be contacted if a spot opens up
• Waitlist position is first-come, first-served
• No payment is required while on the waitlist
• You may be moved to a confirmed spot closer to the tournament date

OTHER OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Consider registering for another division that may have availability:
https://washingtonrugby.org/tournaments/cherry-blossom/register

QUESTIONS?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email: cbt@washingtonrugby.org
Tournament Chair: cbt-chair@washingtonrugby.org

Thank you for your understanding!

Best regards,
Cherry Blossom Tournament Committee
Washington Rugby Football Club
`;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get sheet by name
 */
function getSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    // Create sheet if it doesn't exist
    sheet = ss.insertSheet(sheetName);
  }
  
  return sheet;
}

/**
 * Get setting value from Settings sheet
 */
function getSettingValue(key) {
  try {
    const sheet = getSheet(CONFIG.SHEET_NAME_SETTINGS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        return data[i][1];
      }
    }
  } catch (error) {
    Logger.log('Error getting setting: ' + error.toString());
  }
  return null;
}

/**
 * Generate unique registration ID
 */
function generateRegistrationId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `CBT2026-${timestamp}-${random}`;
}

/**
 * Calculate payment deadline
 */
function calculatePaymentDeadline() {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + CONFIG.PAYMENT_DEADLINE_DAYS);
  return Utilities.formatDate(deadline, Session.getScriptTimeZone(), 'MMMM dd, yyyy');
}

/**
 * Validate registration data
 */
function validateRegistrationData(data) {
  const required = ['teamName', 'division', 'city', 'state', 'contactName', 'email', 'phone'];
  
  for (const field of required) {
    if (!data[field] || data[field].trim() === '') {
      return { 
        valid: false, 
        message: `Missing required field: ${field}` 
      };
    }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { 
      valid: false, 
      message: 'Invalid email format' 
    };
  }
  
  return { valid: true };
}

/**
 * Create JSON response
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// ADMIN HELPER FUNCTIONS
// ============================================

/**
 * Send payment reminder emails (run manually or as trigger)
 */
function sendPaymentReminders() {
  const sheet = getSheet(CONFIG.SHEET_NAME_DATA);
  const data = sheet.getDataRange().getValues();
  
  const today = new Date();
  let remindersSent = 0;
  
  for (let i = 1; i < data.length; i++) {
    const status = data[i][9];
    const paymentStatus = data[i][10];
    const email = data[i][6];
    const teamName = data[i][1];
    const deadline = new Date(data[i][13]);
    
    // Check if payment is overdue and status is still pending
    if (status === 'pending' && paymentStatus === 'unpaid' && deadline < today) {
      const subject = `REMINDER: Payment Due for CBT 2026 - ${teamName}`;
      const body = `
Dear Team Contact,

This is a reminder that payment for ${teamName} is now overdue.

Original Deadline: ${Utilities.formatDate(deadline, Session.getScriptTimeZone(), 'MMMM dd, yyyy')}

Please complete payment as soon as possible to secure your spot.

Payment Link: ${getSettingValue('Zeffy Payment Link')}

Questions? Contact: cbt@washingtonrugby.org

Thank you,
CBT Committee
      `;
      
      MailApp.sendEmail(email, subject, body);
      remindersSent++;
    }
  }
  
  Logger.log(`Payment reminders sent: ${remindersSent}`);
}

/**
 * Export registrations to CSV (helper function)
 */
function exportToCSV() {
  const sheet = getSheet(CONFIG.SHEET_NAME_DATA);
  const data = sheet.getDataRange().getValues();
  
  let csv = '';
  for (let i = 0; i < data.length; i++) {
    csv += data[i].join(',') + '\n';
  }
  
  return csv;
}
