const https = require('https');

// Use environment variable for security
const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;

if (!webhookUrl) {
  console.error('Error: GOOGLE_CHAT_WEBHOOK_URL environment variable is missing.');
  process.exit(1);
}

const messageText = "*CHECKOUT REMINDER*\n\nSudah jam 17:30 WIB.\nJangan lupa checkout";

const payload = JSON.stringify({
  text: messageText
});

const url = new URL(webhookUrl);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (error) => {
  console.error('Error sending message:', error);
  process.exit(1);
});

req.write(payload);
req.end();
