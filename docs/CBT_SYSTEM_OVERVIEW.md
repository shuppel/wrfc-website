# CBT Registration System - Technical Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      CBT REGISTRATION FLOW                           │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│    USER      │
│  (Website)   │
└──────┬───────┘
       │
       │ 1. Fills registration form
       │
       ▼
┌─────────────────────────┐
│  Registration Form      │
│  Component (React)      │
│  /register/page.tsx     │
└──────┬──────────────────┘
       │
       │ 2. Submits JSON data
       │
       ▼
┌─────────────────────────┐
│  Google Apps Script     │
│  (Web App Endpoint)     │
│  doPost() function      │
└──────┬──────────────────┘
       │
       │ 3. Validates & Processes
       │
       ├──────────────────────────────┐
       │                              │
       ▼                              ▼
┌─────────────────┐          ┌────────────────┐
│  Google Sheet   │          │  Email System  │
│  "2026" tab     │          │  MailApp       │
│  Adds new row   │          └────────┬───────┘
└─────────────────┘                   │
       │                              │
       │ 4. Updates count             │ 5. Sends emails
       │                              │
       ▼                              ├──────────────┐
┌─────────────────┐                   │              │
│  "Config" tab   │                   ▼              ▼
│  Increments     │          ┌────────────┐  ┌───────────────┐
│  team count     │          │   Team     │  │     Admin     │
└─────────────────┘          │  Email     │  │ Notification  │
                             └────────────┘  └───────────────┘

┌──────────────────────────────────────────────────────────────┐
│              WEBSITE READS DATA (Public Display)              │
└──────────────────────────────────────────────────────────────┘

       ┌──────────────┐
       │   Website    │
       │  Teams Page  │
       └──────┬───────┘
              │
              │ 6. Fetches team data
              │    (every 5 minutes)
              ▼
       ┌─────────────────────────┐
       │  Google Apps Script     │
       │  doGet() function       │
       │  Returns JSON           │
       └──────┬──────────────────┘
              │
              │ 7. Reads sheet data
              │
              ▼
       ┌─────────────────┐
       │  Google Sheet   │
       │  "2026" tab     │
       │  Filters public │
       │  data only      │
       └─────────────────┘
```

---

## 📊 Data Flow

### Registration Submission (Write)
```javascript
Website Form
  └─> { teamName, division, city, state, contactName, email, phone, ... }
      └─> POST to Apps Script Web App URL
          └─> Validation
              ├─> Generate Registration ID
              ├─> Check Division Availability
              ├─> Calculate Payment Deadline
              └─> Add to Google Sheet
                  ├─> Send Confirmation Email to Team
                  ├─> Send Notification to Admin
                  └─> Return { registrationId, status, deadline }
```

### Teams Display (Read)
```javascript
Website Teams Page
  └─> GET Apps Script Web App URL + "?action=getTeams"
      └─> Apps Script reads "2026" sheet
          └─> Filters sensitive data
              └─> Returns public JSON
                  └─> Website displays teams list
```

---

## 🔒 Security Model

### What's Public
✅ Team Name
✅ Division
✅ City, State
✅ Registration Status
✅ Payment Status
✅ Registration Date

### What's Private (Sheet Only)
🔒 Contact Name
🔒 Email Address
🔒 Phone Number
🔒 Registration ID (sensitive)
🔒 Notes
🔒 Payment Deadline

### Access Control
- **Google Sheet:** Only WRFC team members (shared explicitly)
- **Apps Script:** Executes as script owner (admin)
- **Web App POST:** Anyone can submit (public registration)
- **Web App GET:** Anyone can read (public team list)
- **Website:** No authentication required (public site)

---

## 📁 File Structure

### Backend (Google)
```
Google Sheets Spreadsheet: "CBT Registrations 2026"
├─ Sheet: "2026"        ← Main registration data
├─ Sheet: "Config"      ← Division settings
└─ Sheet: "Settings"    ← System configuration

Google Apps Script: "CBT Registration Automation"
└─ Code.gs              ← All automation logic
```

### Frontend (Website)
```
/app/tournaments/cherry-blossom/
├─ page.tsx                          ← CBT Homepage
├─ register/
│  ├─ page.tsx                       ← Registration Form
│  └─ confirmation/page.tsx          ← Thank You Page
├─ [year]/
│  ├─ page.tsx                       ← Year Details
│  └─ teams/page.tsx                 ← Registered Teams List
└─ history/page.tsx                  ← Tournament Archive

/data/
└─ cherry-blossom-tournaments.ts     ← Tournament metadata

/lib/
├─ google-sheets.ts                  ← API helpers
└─ types/tournament.ts               ← TypeScript types

/components/feature/tournament/
├─ RegistrationForm.tsx              ← Multi-step form
└─ TeamCard.tsx                      ← Team display component
```

---

## 🔄 State Management

### Team Status Lifecycle

```
1. NEW REGISTRATION
   ├─ Division has space?
   │  ├─ YES → Status: "pending"
   │  └─ NO  → Status: "waitlist"
   │
2. PENDING
   ├─ Payment received (manual update)
   │  └─> Status: "confirmed"
   │      Payment Status: "paid"
   │
3. WAITLIST
   ├─ Spot opens (manual update)
   │  └─> Status: "pending"
   │      (Admin manually notifies team)
   │
4. CONFIRMED
   └─ Team is registered and paid
      Ready for tournament
   
5. CANCELLED (if needed)
   └─ Team withdraws
```

### Division Status

```
┌─────────────────────────────────────────────────┐
│ Division: Men's Club                            │
│ Max Teams: 12                                   │
│ Current Count: [Updated automatically]          │
│ Status: Open / Waitlist / Closed               │
└─────────────────────────────────────────────────┘

Status Logic:
- Open: Current Count < Max Teams
- Waitlist: Current Count >= Max Teams
- Closed: Registration period ended
```

---

## 📧 Email Templates

### 1. Confirmation Email (Pending)
**To:** Team contact email
**When:** Immediately after registration
**Content:**
- Registration ID
- Team details
- Payment instructions
- Payment deadline (14 days)
- Zeffy payment link
- Contact information

### 2. Waitlist Email
**To:** Team contact email
**When:** Registration when division is full
**Content:**
- Waitlist confirmation
- Position explanation
- No payment required yet
- Contact for questions

### 3. Admin Notification
**To:** cbt-chair@washingtonrugby.org
**When:** Every new registration
**Content:**
- Full team details
- Contact information
- Link to Google Sheet
- Status (pending/waitlist)

### 4. Payment Reminder (Future)
**To:** Team contact email
**When:** Approaching or past deadline
**Content:**
- Reminder of deadline
- Payment link
- Contact for issues

---

## 🎯 API Endpoints

### POST: Submit Registration
```
URL: https://script.google.com/macros/s/YOUR_ID/exec
Method: POST
Content-Type: application/json

Body:
{
  "teamName": "string",
  "division": "string",
  "city": "string",
  "state": "string",
  "contactName": "string",
  "email": "string",
  "phone": "string",
  "playersCount": "string",
  "notes": "string"
}

Response:
{
  "status": "success",
  "registrationId": "CBT2026-xxxxx",
  "paymentDeadline": "December 15, 2025",
  "teamStatus": "pending",
  "message": "Registration received!"
}
```

### GET: Fetch Teams
```
URL: https://script.google.com/macros/s/YOUR_ID/exec?action=getTeams
Method: GET

Response:
{
  "status": "success",
  "data": [
    {
      "teamName": "DC Thunder",
      "division": "Men's Club",
      "city": "Washington",
      "state": "DC",
      "status": "confirmed",
      "paymentStatus": "paid",
      "registrationDate": "2025-11-20T14:30:00.000Z"
    },
    ...
  ]
}
```

### GET: Division Stats
```
URL: https://script.google.com/macros/s/YOUR_ID/exec?action=getStats
Method: GET

Response:
{
  "status": "success",
  "stats": [
    {
      "division": "Men's Club",
      "fee": 400,
      "maxTeams": 12,
      "currentCount": 3,
      "format": "15s",
      "status": "Open"
    },
    ...
  ]
}
```

---

## 🧪 Testing Checklist

### Google Apps Script Testing
- [ ] doGet returns JSON (open URL in browser)
- [ ] doPost accepts registration (use curl or Postman)
- [ ] Email sent to team contact
- [ ] Email sent to admin
- [ ] Row added to "2026" sheet
- [ ] Division count incremented in "Config" sheet
- [ ] Registration ID generated correctly
- [ ] Payment deadline calculated correctly

### Website Integration Testing
- [ ] Registration form validates input
- [ ] Form submits to Google Apps Script
- [ ] Success message displays
- [ ] Teams page fetches data
- [ ] Teams display correctly
- [ ] Status badges show correct colors
- [ ] Mobile responsive design
- [ ] Dark mode works

### End-to-End Testing
- [ ] User registers team on website
- [ ] Team receives confirmation email
- [ ] Admin receives notification
- [ ] Team appears on website teams list
- [ ] Admin updates payment status in sheet
- [ ] Website reflects payment status
- [ ] Division count updates correctly

---

## 📈 Scalability

### Current Limits
- **Google Sheets:** 10 million cells (more than enough)
- **Apps Script:** 20,000 executions/day (sufficient for CBT)
- **Email:** 500 emails/day per Google Workspace user
- **API Calls:** Website caches for 5 minutes

### If You Outgrow This
- Migrate to Supabase/Vercel Postgres
- Keep Google Sheets as admin interface
- Use real-time webhooks instead of polling

---

## 🔧 Maintenance

### Daily (During Registration Period)
- Check for new registrations
- Update payment statuses
- Respond to team inquiries

### Weekly
- Review division counts
- Send payment reminders
- Update waitlist teams

### Monthly
- Export backup of data
- Review and update email templates
- Check for any errors in execution log

---

## 🚀 Future Enhancements

### Phase 2
- [ ] Automated payment reminders (Apps Script triggers)
- [ ] Waitlist auto-promotion when spots open
- [ ] Division balancing suggestions
- [ ] CSV export button in website

### Phase 3
- [ ] Protected admin dashboard on website
- [ ] Direct payment status updates from Zeffy (if API available)
- [ ] Team portal for roster management
- [ ] Bracket generation tool

### Phase 4
- [ ] Full database migration (if needed)
- [ ] Mobile app integration
- [ ] SMS notifications
- [ ] Advanced analytics dashboard

---

## 📞 Support Contacts

**Google Sheets Setup:**
- Internal tech team

**Website Integration:**
- Development team

**Registration Questions:**
- cbt@washingtonrugby.org
- cbt-chair@washingtonrugby.org

**Technical Issues:**
- Share Apps Script execution log
- Provide: timestamp, error message, what you were doing
