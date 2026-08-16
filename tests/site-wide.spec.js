// ==========================================================================
// Grundfunktionsprüfung: alle Seiten laden fehlerfrei, interne Links,
// robots.txt/sitemap.xml, kein horizontales Scrollen.
// ==========================================================================
const { test, expect } = require("@playwright/test");
const { collectConsoleErrors } = require("./helpers");

const SEITEN = [
  "/index.html",
  "/module.html",
  "/demo.html",
  "/anleitung.html",
  "/impressum.html",
  "/agb.html",
  "/datenschutz.html"
];

for (const seite of SEITEN) {
  test(`${seite} lädt ohne Konsolenfehler und ohne horizontales Scrollen`, async ({ page }) => {
    const errors = await collectConsoleErrors(page);
    const response = await page.goto(seite);
    expect(response.status(), `HTTP-Status für ${seite}`).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `horizontaler Überstand auf ${seite}`).toBeLessThanOrEqual(1);

    expect(errors, `Konsolenfehler auf ${seite}: ${errors.join(" | ")}`).toEqual([]);
  });
}

test("robots.txt verweist auf die richtige Domain und Sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const text = await res.text();
  expect(text).toContain("Sitemap: https://www.hd-hahne.de/sitemap.xml");
  expect(text).not.toContain("hahne-digital.de");
});

test("sitemap.xml verweist ausschließlich auf hd-hahne.de", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const text = await res.text();
  expect(text).not.toContain("hahne-digital.de");
  for (const seite of SEITEN) {
    if (seite === "/index.html") continue;
    expect(text).toContain("https://www.hd-hahne.de" + seite);
  }
});

test("Startseite: canonical, Open-Graph und strukturierte Daten zeigen auf hd-hahne.de", async ({ page }) => {
  await page.goto("/index.html");
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonical).toBe("https://www.hd-hahne.de/");
  const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
  expect(ogUrl).toBe("https://www.hd-hahne.de/");
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(ld).toContain("https://www.hd-hahne.de/");
  expect(ld).not.toContain("hahne-digital.de");
});

test("interne Verweise auf allen Seiten führen zu erreichbaren Zielen (Status 200)", async ({ page, request }) => {
  const geprueft = new Set();
  for (const seite of SEITEN) {
    await page.goto(seite);
    const hrefs = await page.$$eval("a[href]", (as) =>
      as.map((a) => a.getAttribute("href")).filter(Boolean)
    );
    for (const href of hrefs) {
      if (/^(mailto:|tel:|https?:\/\/|#|javascript:)/.test(href)) continue;
      const [pfad] = href.split("#");
      if (!pfad) continue;
      if (geprueft.has(pfad)) continue;
      geprueft.add(pfad);
      const res = await request.get("/" + pfad.replace(/^\//, ""));
      expect(res.status(), `Link ${href} von ${seite} aus`).toBeLessThan(400);
    }
  }
});

test("keine Restverweise auf die falsche Domain hahne-digital.de im HTML", async ({ page }) => {
  for (const seite of SEITEN) {
    await page.goto(seite);
    const html = await page.content();
    const treffer = html.match(/hahne-digital\.de/g) || [];
    expect(treffer, `Restverweise auf ${seite}`).toEqual([]);
  }
});
