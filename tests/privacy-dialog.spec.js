// ==========================================================================
// Datenschutzdialog: Hinweisleiste beim ersten Besuch, beide Wahlmöglich-
// keiten, Einstellungen jederzeit über den Footer-Link erreichbar, Löschen
// gespeicherter Angaben funktioniert.
// ==========================================================================
const { test, expect } = require("@playwright/test");

// Jeder Test erhält von Playwright ohnehin einen frischen, isolierten
// Browserkontext ohne gespeicherte Angaben – ein zusätzliches Löschen bei
// jeder Navigation würde eine soeben getroffene Entscheidung nach einem
// page.reload() wieder verwerfen und damit genau das verfälschen, was hier
// geprüft wird.

test("zeigt beim ersten Besuch die Hinweisleiste mit beiden Wahlmöglichkeiten", async ({ page }) => {
  await page.goto("/index.html");
  const banner = page.locator("#privBanner");
  await expect(banner).toBeVisible();
  await expect(banner.getByText("Gedächtnis erlauben")).toBeVisible();
  await expect(banner.getByText("Nur das Nötigste")).toBeVisible();
});

test('"Nur das Nötigste" schließt die Leiste ohne Speicherung', async ({ page }) => {
  await page.goto("/index.html");
  await page.getByText("Nur das Nötigste").click();
  await expect(page.locator("#privBanner")).toHaveCount(0, { timeout: 2000 });
  const gespeichert = await page.evaluate(() => window.localStorage.getItem("hd_privatsphaere"));
  expect(gespeichert).toContain("nichts");
});

test('"Gedächtnis erlauben" speichert die Entscheidung', async ({ page }) => {
  await page.goto("/index.html");
  await page.getByText("Gedächtnis erlauben").click();
  await expect(page.locator("#privBanner")).toHaveCount(0, { timeout: 2000 });
  const gespeichert = await page.evaluate(() => window.localStorage.getItem("hd_privatsphaere"));
  expect(gespeichert).toContain("alles");
});

test("Leiste erscheint bei erneutem Besuch nicht mehr, wenn schon entschieden wurde", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByText("Nur das Nötigste").click();
  await page.reload();
  await expect(page.locator("#privBanner")).toHaveCount(0);
});

test('Footer-Link "Privatsphäre" öffnet die Einstellungen jederzeit erneut', async ({ page }) => {
  await page.goto("/index.html");
  await page.getByText("Nur das Nötigste").click();
  await page.locator(".priv-link").first().click();
  const dialog = page.locator("#privDialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Gedächtnis des Assistenten");
});

test("Löschen-Knopf im Einstellungsdialog entfernt gespeicherte Angaben", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByText("Gedächtnis erlauben").click();
  await page.locator(".priv-link").first().click();
  await page.locator('[data-loeschen="1"]').click();
  await expect(page.locator("#privDialog")).toContainText("gelöscht");
  const nachher = await page.evaluate(() => window.localStorage.getItem("hd_assistent_v1"));
  expect(nachher).toBeNull();
});
