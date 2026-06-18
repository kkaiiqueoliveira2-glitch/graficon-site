import puppeteer from "puppeteer";

const URL = process.env.DIAG_URL || "http://localhost:4173/";

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 800));

const result = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  const all = document.querySelectorAll("*");
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    // elemento mais largo que a viewport OU que ultrapassa a borda direita
    if (r.right > vw + 1 || r.left < -1 || r.width > vw + 1) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.toString().slice(0, 80)) || "",
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  }
  return {
    vw,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: out.slice(0, 40),
  };
});

console.log("viewport:", result.vw);
console.log("documentElement.scrollWidth:", result.docScrollWidth);
console.log("body.scrollWidth:", result.bodyScrollWidth);
console.log("--- offenders (width/right > viewport) ---");
for (const o of result.offenders) {
  console.log(`${o.tag}.${o.cls}  left=${o.left} right=${o.right} w=${o.width}`);
}

await browser.close();
