const fs = require("fs");
const https = require("https");

// Convert date to Philippine Time
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

      // Create boxed quote formatting
      const maxWidth = Math.max(quote.length, author.length + 3);
      const top = "╭" + "─".repeat(maxWidth + 2) + "╮";
      const bottom = "╰" + "─".repeat(maxWidth + 2) + "╯";

      const quoteLine = `│  ${quote.padEnd(maxWidth, " ")}  │`;
      const authorLine = `│  — ${author.padEnd(maxWidth - 2 - author.length, " ")} │`;

      const box = `${top}\n${quoteLine}\n${authorLine}\n${bottom}`;

      const content = `# 🧠 Daily Programming Quote

${box}

_Last updated: ${formatPHTime()}_
`;

      fs.writeFileSync("README.md", content);
      console.log("✅ README updated successfully");
    } catch (err) {
      console.error("❌ Parsing error:", err);
    }
  });
});
