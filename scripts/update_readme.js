const fs = require("fs");
const https = require("https");

https.get("https://zenquotes.io/api/random", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    try {
      const quoteData = JSON.parse(data)[0];
      const quote = `"${quoteData.q}" — *${quoteData.a}*`;

      const content = `# 🧠 Daily Programming Quote\n\n${quote}\n\n_Last updated: ${new Date().toLocaleString()}_`;

      fs.writeFileSync("README.md", content);
      console.log("README updated");
    } catch (e) {
      console.error("Parsing error", e);
    }
  });
});
