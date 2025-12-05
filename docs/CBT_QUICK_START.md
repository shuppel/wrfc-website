# Cherry Blossom Tournament Registration - Quick Start Guide

## 🎯 Overview

This guide will help you set up the Google Sheets automation for CBT 2026 registrations in **15 minutes**.

---

## ✅ Step-by-Step Setup

### Step 1: Create Google Sheet (5 minutes)

1. Go to https://sheets.google.com
2. Click **Blank** to create new spreadsheet
3. Name it: **CBT Registrations 2026**
4. Click **Share** button (top right)
   - Add: cbt-chair@washingtonrugby.org
   - Add any other team members who need access
   - Set permissions to "Editor"

### Step 2: Set Up Sheet Structure (3 minutes)

You need to create **3 sheets** (tabs) in your spreadsheet:

#### Sheet 1: "2026" (Main Data)

1. Click the "+" at bottom to add a new sheet
2. Double-click "Sheet1" and rename to: **2026**
3. Add these column headers in Row 1:

```
A1: Timestamp
B1: Team Name
C1: Division
D1: City
E1: State
F1: Contact Name
G1: Email
H1: Phone
I1: Players Count
J1: Status
K1: Payment Status
L1: Registration ID
M1: Notes
N1: Payment Deadline
```

**Formatting (optional but recommended):**
- Select Row 1
- Bold the text (Ctrl+B)
- Add background color (light blue)
- Freeze row: View > Freeze > 1 row

#### Sheet 2: "Config" (Division Settings)

1. Add new sheet, rename to: **Config**
2. Add headers in Row 1:

```
A1: Division Name
B1: Fee
C1: Max Teams
D1: Current Count
E1: Format
F1: Status
```

3. Add these rows of data (starting at Row 2):

```
Row 2: Men's Club          | 400 | 12 | 0 | 15s | Open
Row 3: Women's College     | 400 | 8  | 0 | 7s  | Open
Row 4: Men's Old Boys      | 350 | 8  | 0 | 15s | Open
Row 5: Men's College       | 400 | 8  | 0 | 7s  | Open
Row 6: High School / U18   | 350 | 8  | 0 | 15s | Open
```

#### Sheet 3: "Settings" (Configuration)

1. Add new sheet, rename to: **Settings**
2. Add two columns:

```
A1: Key                          | B1: Value
A2: Tournament Date              | B2: April 25, 2026 (Pending)
A3: Registration Opens           | B3: November 15, 2025
A4: Registration Closes          | B4: April 22, 2026
A5: Payment Deadline Days        | B5: 14
A6: Admin Email                  | B6: cbt-chair@washingtonrugby.org
A7: Confirmation Email From      | B7: cbt@washingtonrugby.org
A8: Zeffy Payment Link           | B8: https://www.zeffy.com/placeholder
```

### Step 3: Install Google Apps Script (5 minutes)

1. In your Google Sheet, click **Extensions > Apps Script**
2. You'll see a code editor with some default code
3. **Delete ALL the default code**
4. Open this file in the project: `docs/GOOGLE_APPS_SCRIPT.js`
5. **Copy ALL the code** from that file
6. **Paste** it into the Apps Script editor
7. Click the **Save** icon (💾) or press Ctrl+S
8. Name the project: **CBT Registration Automation**

### Step 4: Deploy as Web App (2 minutes)

1. In Apps Script editor, click **Deploy > New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description:** CBT Registration API
   - **Execute as:** Me (your-email@washingtonrugby.org)
   - **Who has access:** Anyone

5. Click **Deploy**

6. **IMPORTANT: Authorization**
   - Click "Review permissions"
   - Choose your Google account
   - You'll see a warning "Google hasn't verified this app"
   - Click "Advanced"
   - Click "Go to CBT Registration Automation (unsafe)"
   - Click "Allow"

7. **Copy the Web App URL** 
   - It looks like: `https://script.google.com/macros/s/AKfycbxxxxx.../exec`
   - **Save this URL** - you'll need it for the website!

### Step 5: Test the Script (2 minutes)

1. Open your Web App URL in a new browser tab
2. You should see: `{"status":"success","data":[]}`
3. ✅ If you see this, it's working!

To test registration submission, use this curl command (replace YOUR_WEB_APP_URL):

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{"teamName":"Test Team","division":"Men'\''s Club","city":"Washington","state":"DC","contactName":"John Doe","email":"your-email@example.com","phone":"555-1234","playersCount":"25","notes":"Test"}'
```

**Expected results:**
- ✅ New row appears in "2026" sheet
- ✅ You receive a confirmation email
- ✅ cbt-chair@ receives admin notification
- ✅ "Config" sheet shows "Current Count" = 1 for Men's Club

---

## 🔧 Add URL to Website

1. In your project, create a file: `.env.local`
2. Add this line (replace with your actual URL):

```bash
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec
NEXT_PUBLIC_CBT_EMAIL=cbt@washingtonrugby.org
NEXT_PUBLIC_CBT_CHAIR_EMAIL=cbt-chair@washingtonrugby.org
```

3. Restart your development server

---

## 📋 Manual Management

### Viewing Registrations

Open your Google Sheet to see all registrations in real-time.

### Updating Payment Status

When a team pays:
1. Find their row in the "2026" sheet
2. Column K (Payment Status): Change "unpaid" to "paid"
3. Column J (Status): Change "pending" to "confirmed"

### Adding Teams to Confirmed

After payment is confirmed:
1. Update Status to "confirmed"
2. Send follow-up email with tournament details

### Handling Waitlist

When a spot opens:
1. Find waitlisted team in "2026" sheet
2. Change Status from "waitlist" to "pending"
3. Manually email them about the opening
4. They have 48 hours to pay

### Cancellations

If a team cancels:
1. Change Status to "cancelled"
2. Update "Config" sheet: decrease "Current Count"
3. Check waitlist for next team

---

## 🔄 Updating the Script

If you need to make changes to the script:

1. Go back to **Extensions > Apps Script**
2. Make your changes to the code
3. **Save** (Ctrl+S)
4. Click **Deploy > Manage deployments**
5. Click the edit icon (pencil) next to your deployment
6. Change **Version** to "New version"
7. Add description: "Updated email template" (or whatever you changed)
8. Click **Deploy**

**Important:** The Web App URL stays the same! No need to update the website.

---

## 📧 Email Customization

To customize email templates:

1. Open Apps Script editor
2. Find these functions:
   - `getConfirmationEmailBody()` - Team confirmation email
   - `getWaitlistEmailBody()` - Waitlist notification
   - `sendAdminNotification()` - Admin alert
3. Edit the text between the backticks ` ` `
4. Save and redeploy (see "Updating the Script" above)

---

## 🐛 Troubleshooting

### Emails Not Sending

**Check execution log:**
1. Apps Script editor > View > Executions
2. Look for red errors
3. Common issues:
   - Email quota exceeded (500/day limit)
   - Invalid email address
   - Missing email in "Settings" sheet

**Fix:**
- Wait if quota exceeded (resets daily)
- Verify email addresses are correct
- Check Settings sheet has email addresses filled in

### Registration Not Showing in Sheet

**Check:**
1. Apps Script > View > Executions
2. Look for the doPost execution
3. Check for errors

**Common issues:**
- Column headers don't match exactly (case-sensitive!)
- Sheet name is wrong (must be exactly "2026")
- Web App not deployed with "Who has access: Anyone"

### Website Can't Fetch Teams

**Check:**
1. Copy Web App URL
2. Paste in browser - should see JSON
3. If you see error: Redeploy with "Who has access: Anyone"

**Fix:**
- Verify NEXT_PUBLIC_GOOGLE_SHEETS_API_URL in .env.local
- Check URL has no extra spaces
- Make sure to restart dev server after adding .env.local

---

## 🎓 Training Video Script

*We can create a Loom video walking through these steps if needed!*

1. [0:00-0:30] Introduction & Overview
2. [0:30-3:00] Creating Google Sheet & Structure
3. [3:00-6:00] Installing Apps Script
4. [6:00-8:00] Deploying as Web App
5. [8:00-10:00] Testing & Verification
6. [10:00-12:00] Managing Registrations
7. [12:00-15:00] Troubleshooting Tips

---

## 📞 Support

**Setup Questions:**
- Internal tech team

**Registration Issues:**
- cbt-chair@washingtonrugby.org

**Script Errors:**
- Share the execution log screenshot
- Include: timestamp, error message, what you were trying to do

---

## ✨ Next Steps

Once Google Sheets is set up, the website team will:
1. Build the registration form UI
2. Connect it to your Google Apps Script
3. Create the teams display page
4. Add CBT homepage with registration link

**Timeline:** 
- Google Sheets setup: Today
- Website integration: 1-2 weeks
- Testing period: 1 week before registration opens
- Launch: November 15, 2025

---

## 🎉 You're Done!

Your Google Sheets automation is now ready to:
- ✅ Accept team registrations
- ✅ Send automatic confirmation emails
- ✅ Notify admins of new registrations
- ✅ Track payment status
- ✅ Manage waitlists
- ✅ Provide live data to website

**Save these important links:**
- Google Sheet: [YOUR_SHEET_URL]
- Apps Script: [YOUR_SCRIPT_URL]
- Web App URL: [YOUR_WEB_APP_URL] (needed for website)
