// ==========================================================================
// Sprachumschaltung: Wechsel funktioniert, Navigation übersetzt sich,
// Rechtsseiten zeigen ehrlichen Hinweis, dass nur die deutsche Fassung gilt.
// ==========================================================================
const { test, expect } = require("@playwright/test");
const { preSeedPrivacyDecision } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await preSeedPrivacyDecision(page);
});

test("Sprachumschalter wechselt die Navigation auf Englisch", async ({ page }) => {
  await page.goto("/index.html");
  await page.locator("#sprachKnopf").click();
  await page.locator('#sprachListe [data-code="en"]').click();
  await expect(page.locator("#navlinks a").first()).toHaveText("Services");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("Arabisch schaltet die Schreibrichtung auf rechts-nach-links", async ({ page }) => {
  await page.goto("/index.html");
  await page.locator("#sprachKnopf").click();
  await page.locator('#sprachListe [data-code="ar"]').click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("Rechtsseiten zeigen bei fremder Sprache den Hinweis auf die deutsche Fassung", async ({ page }) => {
  await page.goto("/impressum.html");
  await page.locator("#sprachKnopf").click();
  await page.locator('#sprachListe [data-code="en"]').click();
  await expect(page.locator("#sprachHinweis")).toBeVisible();
  await expect(page.locator("#sprachHinweis")).toContainText(/Deutsch|German/);
});

test("Sprachwahl bleibt über einen Seitenwechsel hinweg erhalten", async ({ page }) => {
  await page.goto("/index.html");
  await page.locator("#sprachKnopf").click();
  await page.locator('#sprachListe [data-code="da"]').click();
  await page.goto("/module.html");
  await expect(page.locator("html")).toHaveAttribute("lang", "da");
});
