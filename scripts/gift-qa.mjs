import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

async function measure(page) {
  return page.evaluate(() => {
    const overlay = document.querySelector(".gift-overlay");
    if (!overlay) return { overlay: false, flag: localStorage.getItem("peachy_first_gift") };
    const scene = document.querySelector(".gift-scene");
    const quote = document.querySelector(".gift-quote");
    const peach = overlay.querySelector(".rodaki svg");
    const o = overlay.getBoundingClientRect();
    const s = scene.getBoundingClientRect();
    const q = quote.getBoundingClientRect();
    const p = peach.getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight;
    return {
      overlay: true,
      pos: getComputedStyle(overlay).position,
      covers: Math.abs(o.width - vw) < 2 && Math.abs(o.height - vh) < 2 && Math.abs(o.x) < 2 && Math.abs(o.y) < 2,
      peach: Math.round(p.width),
      gap: Math.round(q.top - p.bottom),
      centerDx: Math.round(s.left + s.width / 2 - vw / 2),
      centerDy: Math.round(s.top + s.height / 2 - vh / 2),
      quote: quote.innerText,
      quoteW: Math.round(q.width),
      quoteBottomRoom: Math.round(o.bottom - q.bottom),
      quoteClipped: q.bottom > o.bottom - 1 || q.right > o.right - 24 || q.left < 24,
      padBottom: getComputedStyle(overlay).paddingBottom,
      flag: localStorage.getItem("peachy_first_gift"),
      bubbles: overlay.querySelectorAll(".gift-bubble").length,
    };
  });
}

const results = {};

{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://127.0.0.1:8080/?gift=1", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  results.mobile = await measure(page);
  await page.screenshot({ path: "/workspace/screenshots/qa-gift-mobile.png" });
  await page.click(".gift-overlay");
  await page.waitForTimeout(400);
  results.mobileAfterTap = {
    overlay: await page.locator(".gift-overlay").count(),
    flag: await page.evaluate(() => localStorage.getItem("peachy_first_gift")),
  };
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  results.mobileReloadPreview = {
    overlay: await page.locator(".gift-overlay").count(),
    flag: await page.evaluate(() => localStorage.getItem("peachy_first_gift")),
  };
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  results.firstPaintFlag = await page.evaluate(() => localStorage.getItem("peachy_first_gift"));
  results.firstPaintOverlay = await page.locator(".gift-overlay").count();
  if (results.firstPaintOverlay) {
    await page.click(".gift-overlay");
    await page.waitForTimeout(400);
  }
  results.afterRealDismiss = {
    overlay: await page.locator(".gift-overlay").count(),
    flag: await page.evaluate(() => localStorage.getItem("peachy_first_gift")),
  };
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  results.secondLaunch = {
    overlay: await page.locator(".gift-overlay").count(),
    flag: await page.evaluate(() => localStorage.getItem("peachy_first_gift")),
  };
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
