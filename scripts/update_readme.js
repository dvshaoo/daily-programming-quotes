const fs = require("fs");
const https = require("https");

// Convert time to PH timezone
function formatPHTime() {
  return new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" });
}

https.get("https://zenquotes.io/api/random", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    try {
      const q = JSON.parse(data)[0];
      const quote = q.q;
      const author = q.a;

      const content = `# 🧠 Daily Programming Quote

> "${quote}"
> — **${author}**

_Last updated: ${formatPHTime()}_
`;

      fs.writeFileSync("README.md", content);
      console.log("✅ README updated");
    } catch (err) {
      console.error("❌ Parsing error:", err);
    }
  });
});
