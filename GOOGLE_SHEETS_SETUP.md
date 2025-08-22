# Google Sheets Integration Setup for ISC Registration Form

This guide will help you set up the registration form to send data directly to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ISC Registration Applications"
4. Copy the Sheet ID from the URL (the long string between /d/ and /edit)

## Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Name it "ISC Registration Handler"
4. Replace the default code with the contents of `google-apps-script.js`
5. Replace `'YOUR_GOOGLE_SHEET_ID'` with your actual Sheet ID from Step 1

## Step 3: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the Web App URL

## Step 4: Update Your Website

1. Open `script.js`
2. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'` with your Web App URL from Step 3

## Step 5: Test the Integration

1. Fill out the registration form on your website
2. Submit the form
3. Check your Google Sheet - a new row should appear
4. Check your email for the notification

## Form Fields Mapping

The form will send these fields to Google Sheets:

| Column | Field Name | Description |
|--------|------------|-------------|
| A | Timestamp | When the form was submitted |
| B | Full Name | Applicant's full name |
| C | Phone Number | Contact phone number |
| D | Student ID | PSU student ID |
| E | Major | Student's major |
| F | Expected Graduation Year | Expected graduation year |
| G | Role | Desired role in ISC |
| H | Department Preferred | Preferred department (PM, HR, PR, Marketing, Logistics, Finance) |
| I | Role Suitability | Why they suit the role |
| J | Previous Experience | Relevant experience |
| K | Resume/Work | File attachment info |

## Email Notifications

- **Applicant**: Confirmation email (requires adding email field to form)
- **ISC Team**: Notification email to internationalstudentsclub@psu.edu.sa

## Troubleshooting

### Common Issues:

1. **"Script URL not found"**: Make sure you've deployed the script as a web app
2. **"Access denied"**: Check that the web app is set to "Anyone" access
3. **"Sheet not found"**: Verify the Sheet ID is correct
4. **Form not submitting**: Check browser console for JavaScript errors

### Testing:

- Use the browser's Developer Tools (F12) to check for errors
- Test with a simple form submission first
- Verify the Google Apps Script logs for any errors

## Security Notes

- The web app is publicly accessible but only accepts POST requests
- Consider adding rate limiting for production use
- File uploads are currently handled as text (file names only)
- For full file handling, you'll need to modify the Google Apps Script

## Customization

You can modify the Google Apps Script to:
- Add more validation
- Send emails to different addresses
- Format the data differently
- Add additional processing logic
- Handle file uploads (requires more complex setup)

## Support

If you encounter issues:
1. Check the Google Apps Script execution logs
2. Verify all URLs and IDs are correct
3. Test with a simple form first
4. Check browser console for JavaScript errors
