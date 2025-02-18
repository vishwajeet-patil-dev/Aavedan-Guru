require("dotenv").config();
const https = require("https");

const { GEMINI_API_KEY } = process.env;

const options = {
  hostname: "generativelanguage.googleapis.com",
  port: 443,
  path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Response:", JSON.parse(data).candidates[0].content);
  });
});

// Send the request body
const requestBody = JSON.stringify({
  contents: [
    {
      parts: [{ text: "Explain response body of gemini ai API ??" }],
    },
  ],
});

req.write(requestBody);
req.end();
