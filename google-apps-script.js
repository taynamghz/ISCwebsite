// // Google Apps Script for ISC Registration Form
// // Deploy this as a web app to handle form submissions

// function doPost(e) {
//   try {
//     // Parse the form data
//     const formData = e.parameter;
    
//     // Get the current date and time
//     const timestamp = new Date().toLocaleString('en-US', {
//       timeZone: 'Asia/Riyadh'
//     });
    
//     // Check if this is a registration form or contact form
//     if (formData.fullName && formData.phoneNumber && formData.studentId) {
//       // Registration form submission
//       const rowData = [
//         timestamp, // Timestamp
//         formData.fullName || '',
//         formData.phoneNumber || '',
//         formData.studentId || '',
//         formData.major || '',
//         formData.graduationYear || '',
//         formData.role || '',
//         formData.department || '',
//         formData.roleSuitability || '',
//         formData.previousExperience || '',
//         formData.resume || 'No file attached'
//       ];
      
//       // Get the Google Sheet for registrations
//       const sheet = SpreadsheetApp.openById('1DiXUwJsISmcNJfn1ldIwlJ0rWh1UanzhKP5u9Y7-AJM').getActiveSheet();
      
//       // Append the data to the sheet
//       sheet.appendRow(rowData);
      
//       // Send confirmation email to applicant + notify ISC team
//       sendConfirmationEmail(formData.fullName, formData.studentId, formData.phoneNumber);
      
//       // Return success response
//       return ContentService
//         .createTextOutput(JSON.stringify({
//           'status': 'success',
//           'message': 'Application submitted successfully!'
//         }))
//         .setMimeType(ContentService.MimeType.JSON);
        
//     } else if (formData.contactName && formData.contactEmail) {
//       // Contact form submission
//       const contactData = [
//         timestamp, // Timestamp
//         formData.contactName || '',
//         formData.contactEmail || '',
//         formData.subject || '',
//         formData.message || ''
//       ];
      
//       // Get the Google Sheet for contacts
//       const sheet = SpreadsheetApp.openById('1DiXUwJsISmcNJfn1ldIwlJ0rWh1UanzhKP5u9Y7-AJM').getActiveSheet();
      
//       // Append the contact data to the sheet
//       sheet.appendRow(contactData);
      
//       // Send notification email to ISC team
//       sendContactNotification(formData.contactName, formData.contactEmail, formData.subject, formData.message);
      
//       // Return success response
//       return ContentService
//         .createTextOutput(JSON.stringify({
//           'status': 'success',
//           'message': 'Message sent successfully!'
//         }))
//         .setMimeType(ContentService.MimeType.JSON);
//     }
      
//   } catch (error) {
//     // Return error response
//     return ContentService
//       .createTextOutput(JSON.stringify({
//         'status': 'error',
//         'message': 'Error submitting form: ' + error.toString()
//       }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
// }

// // Send thank-you email to applicant + notify ISC
// function sendConfirmationEmail(name, studentId, phone) {
//   try {
//     const subject = 'ISC Application Received - International Students Club';
//     const body = `
//       Dear ${name},
      
//       Thank you for your application to join the International Students Club (ISC) at Prince Sultan University!
      
//       We have received your application and will review it carefully. You will hear from us within 3-5 business days.
      
//       Application Details:
//       - Name: ${name}
//       - Student ID: ${studentId}
//       - Phone: ${phone}
//       - Submitted: ${new Date().toLocaleString('en-US', {timeZone: 'Asia/Riyadh'})}
      
//       If you have any questions, please contact us at internationalstudentsclub@psu.edu.sa
      
//       Best regards,
//       ISC Team
//       International Students Club
//       Prince Sultan University
//     `;
    
//     // Construct applicant's PSU email
//     const applicantEmail = studentId + '@psu.edu.sa';
    
//     // Send thank-you email to applicant
//     GmailApp.sendEmail(applicantEmail, subject, body);
    
//     // Notify ISC team
//     GmailApp.sendEmail(
//       'internationalstudentsclub@psu.edu.sa', 
//       'New ISC Application: ' + name, 
//       'A new application has been submitted:\n\n' + body
//     );
      
//   } catch (error) {
//     console.log('Error sending confirmation email: ' + error.toString());
//   }
// }

// // Function to send contact form notification
// function sendContactNotification(name, email, subject, message) {
//   try {
//     const subjectLine = 'New Contact Form Message from ISC Website';
//     const body = `
//       A new message has been received through the ISC website contact form:
      
//       From: ${name}
//       Email: ${email}
//       Subject: ${subject}
//       Message: ${message}
      
//       Timestamp: ${new Date().toLocaleString('en-US', {timeZone: 'Asia/Riyadh'})}
      
//       Please respond to this inquiry at your earliest convenience.
      
//       Best regards,
//       ISC Website System
//     `;
    
//     // Send notification to ISC team
//     GmailApp.sendEmail('internationalstudentsclub@psu.edu.sa', subjectLine, body);
      
//   } catch (error) {
//     console.log('Error sending contact notification: ' + error.toString());
//   }
// }

// // Function to set up the Google Sheet headers
// function setupSheet() {
//   const sheet = SpreadsheetApp.openById('1DiXUwJsISmcNJfn1ldIwlJ0rWh1UanzhKP5u9Y7-AJM').getActiveSheet();
  
//   // Set headers
//   const headers = [
//     'Timestamp',
//     'Full Name',
//     'Phone Number', 
//     'Student ID',
//     'Major',
//     'Expected Graduation Year',
//     'Role',
//     'Department Preferred',
//     'Why do you suit this role?',
//     'Previous Experience',
//     'Resume/Work Attached'
//   ];
  
//   sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
//   sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
//   sheet.getRange(1, 1, 1, headers.length).setBackground('#f0f0f0');
  
//   // Auto-resize columns
//   sheet.autoResizeColumns(1, headers.length);
// }
