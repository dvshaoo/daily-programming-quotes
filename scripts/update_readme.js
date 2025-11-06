const fs = require("fs");
const https = require("https");

https.get("https://programming-quotes-api.vercel.app/api/random", (res) => {
  let data = "";

  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    try {
      const quoteData = JSON.parse(data);
      const quote = `"${quoteData.en}" — *${quoteData.author}*`;

      const content = `# 🧠 Daily Programming Quote

> ${quote}

---

_Last updated: ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}_
`;

      fs.writeFileSync("README.md", content);
      console.log("✅ README updated successfully");
    } catch (e) {
      console.error("❌ Parsing error", e);
    }
  });
});
