# Google Sheets Registration System Setup

## Overview
This system uses Google Sheets + Apps Script to manage Cherry Blossom Tournament registrations, send automated emails, and provide a JSON feed for the website.

---

## Step 1: Create Google Sheet

1. Go to Google Sheets: https://sheets.google.com
2. Create a new spreadsheet
3. Name it: **"CBT Registrations 2026"**
4. Share with your team (cbt-chair@washingtonrugby.org and any other team members)

### Sheet Structure

Create **3 sheets** within the spreadsheet:

#### Sheet 1: "2026"
**Columns (Row 1 - Headers):**
```
A: Timestamp
B: Team Name
C: Division
D: City
E: State
F: Contact Name
G: Email
H: Phone
I: Players Count
J: Status
K: Payment Status
L: Registration ID
M: Notes
N: Payment Deadline
```

#### Sheet 2: "Config"
```
A: Division Name
B: Fee
C: Max Teams
D: Current Count
E: Format
F: Status

Rows:
Men's Club          | 400 | 12 | 0 | 15s | Open
Women's College     | 400 | 8  | 0 | 7s  | Open
Men's Old Boys      | 350 | 8  | 0 | 15s | Open
Men's College       | 400 | 8  | 0 | 7s  | Open
High School / U18   | 350 | 8  | 0 | 15s | Open
```

#### Sheet 3: "Settings"
```
A: Key                    | B: Value
Tournament Date           | April 25, 2026 (Pending)
Registration Opens        | November 15, 2025
Registration Closes       | April 22, 2026
Payment Deadline Days     | 14
Admin Email              | cbt-chair@washingtonrugby.org
Confirmation Email From  | cbt@washingtonrugby.org
Zeffy Payment Link       | [TO BE ADDED]
```

---

## Step 2: Install Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete the default `myFunction()` code
3. Copy and paste the script from `GOOGLE_APPS_SCRIPT.js` (see below)
4. Save the script (Ctrl+S or Cmd+S)
5. Name the project: **"CBT Registration Automation"**

---

## Step 3: Deploy Apps Script as Web App

1. In Apps Script editor, click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description:** "CBT Registration API"
   - **Execute as:** Me (your-email@washingtonrugby.org)
   - **Who has access:** Anyone
5. Click **Deploy**
6. **Authorize access** when prompted:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to CBT Registration Automation (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** - you'll need this for the website
   - It will look like: `https://script.google.com/macros/s/AKfycby.../exec`

---

## Step 4: Test the Script

### Test the doGet (Public JSON Feed)

1. Open the Web App URL in your browser
2. You should see JSON output: `{"status":"success","data":[]}`
3. This is the public feed the website will use

### Test the doPost (Registration Submission)

Use this `curl` command (replace `YOUR_WEB_APP_URL`):

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "teamName": "Test Team",
    "division": "Men'\''s Club",
    "city": "Washington",
    "state": "DC",
    "contactName": "John Doe",
    "email": "test@example.com",
    "phone": "555-123-4567",
    "playersCount": "25",
    "notes": "Test registration"
  }'
```

**Expected Result:**
- New row added to "2026" sheet
- Two emails sent (confirmation + admin notification)
- JSON response with registration ID

---

## Step 5: Add Web App URL to Website Environment

1. Create `.env.local` file in your website root:

```bash
# Google Sheets API
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_ID/exec

# Email
NEXT_PUBLIC_CBT_EMAIL=cbt@washingtonrugby.org
NEXT_PUBLIC_CBT_CHAIR_EMAIL=cbt-chair@washingtonrugby.org
```

2. Add to `.env.example` (without actual values):

```bash
# Google Sheets API for tournament registration
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=your_apps_script_url_here

# CBT Email Addresses
NEXT_PUBLIC_CBT_EMAIL=cbt@washingtonrugby.org
NEXT_PUBLIC_CBT_CHAIR_EMAIL=cbt-chair@washingtonrugby.org
```

---

## Step 6: Update Script When Needed

When you need to make changes to the script:

1. Go back to Apps Script editor
2. Make your changes
3. **Save** (Ctrl+S)
4. **Deploy > Manage deployments**
5. Click the edit icon (pencil) next to your deployment
6. Change **Version** to "New version"
7. Add description of changes
8. Click **Deploy**

**Important:** The Web App URL stays the same! No need to update the website.

---

## Troubleshooting

### Emails Not Sending
- Check Apps Script execution log: View > Executions
- Verify email addresses in "Settings" sheet
- Check Gmail quota (500 emails/day for Google Workspace)

### Registration Not Appearing in Sheet
- Check Apps Script execution log for errors
- Verify column headers match exactly
- Check Web App permissions

### Website Can't Fetch Data
- Verify Web App URL is correct
- Check "Who has access" is set to "Anyone"
- Test URL directly in browser

### "Authorization Required" Error
- Redeploy the Web App
- Re-authorize permissions
- Make sure "Execute as: Me" is selected

---

## Security Notes

- ✅ Public feed only exposes: Team Name, Division, City, State, Status
- ✅ Contact info (email, phone) only visible in Google Sheet (internal team)
- ✅ Registration IDs are random and can't be guessed
- ✅ Apps Script requires Google account authentication to modify
- ⚠️ Anyone with the Web App URL can submit registrations (this is intended)
- ⚠️ Implement rate limiting if you get spam (Apps Script has built-in quotas)

---

## Maintenance Tasks

### Weekly During Registration Period
- [ ] Check for pending payments (Status = "pending")
- [ ] Send payment reminders to teams approaching deadline
- [ ] Update payment status when confirmed
- [ ] Move to "confirmed" status when paid

### Division Full?
1. Update "Config" sheet: Status = "Waitlist"
2. Script will automatically add new teams to waitlist
3. Send waitlist notification email instead

### End of Registration
1. Export "2026" sheet as CSV backup
2. Archive previous year's data
3. Update division counts for planning

---

## Future Enhancements

**Phase 2: Payment Webhooks**
- If Zeffy adds webhook support, integrate automatic payment status updates

**Phase 3: Admin Dashboard**
- Build protected admin page on website
- View/edit registrations
- Send bulk emails
- Export reports

**Phase 4: Advanced Automation**
- Scheduled payment reminders (Apps Script triggers)
- Automatic waitlist notifications
- Division balancing suggestions

---

## Support

For technical issues with:
- **Google Sheets/Apps Script:** Contact tech team
- **Website integration:** Check deployment logs in Vercel
- **Email delivery:** Check Apps Script execution log

For registration questions:
- Email: cbt-chair@washingtonrugby.org
