# Google Sheets contact form setup

The website is prepared to send Contact Us submissions to the `Contact Submissions` tab in spreadsheet `13OgaDCWRKjAO-oNecOXxCbdqT_9eQSypAgiL7tqbcJ4`. The Apps Script source is in `google-apps-script/Code.gs`.

## Deploy the endpoint

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with `google-apps-script/Code.gs` and save.
3. Choose **Deploy → New deployment → Web app**.
4. Set **Execute as** to **Me** and **Who has access** to **Anyone**, then deploy and authorize it.
5. Copy the deployed URL ending in `/exec` and send that URL to the developer. Do not share account passwords or access tokens.

The script writes timestamp, full name, email, message, `New`, and a blank follow-up note to columns A–F, beginning at row 7. It uses a lock, validates input, and prevents submitted text from being treated as a formula.

After the deployed URL is added to `contact-config.js`, the contact form will submit directly to Sheets and stay on the page. Until then, it will show that the connection is not configured; it will not open an email app.
