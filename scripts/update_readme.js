const fs = require("fs");
const https = require("https");

function fetchQuote() {
  return new Promise((resolve, reject) => {
    https.get("https://zenquotes.io/api/random", (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const q = JSON.parse(data)[0];
          resolve({ text: q.q, author: q.a });
        } catch (err) {
          reject("Parsing error: " + err);
        }
      });
    }).on("error", err => reject(err));
  });
}

(async () => {
  try {
    const { text, author } = await fetchQuote();
    const timestamp = new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" });

    const box = 
`╭─────────────────────────────────────────────╮
│  "${text}"  
│              — ${author}
╰─────────────────────────────────────────────╯
_Last updated: ${timestamp}_

`;

    let readme = "";
    if (fs.existsSync("README.md")) readme = fs.readFileSync("README.md", "utf-8");

  
    if (!readme.includes("🧠 Daily Programming Quotes Log"))
      readme = "# 🧠 Daily Programming Quotes Log\n\n" + readme;

    fs.writeFileSync("README.md", readme + "\n" + box);

    console.log("✅ Quote appended successfully");
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
