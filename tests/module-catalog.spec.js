// ==========================================================================
// Modulkatalog: Suche, Kategorie-Filter, Kauf/Miete-Umschalter,
// Kostenschätzung, Angebot als PDF (nur lokaler Download, kein Versand),
// Domain-Übernahme aus dem Katalog heraus.
// ==========================================================================
const { test, expect } = require("@playwright/test");
const { preSeedPrivacyDecision } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await preSeedPrivacyDecision(page);
  await page.goto("/module.html#katalog");
});

test("Suche filtert die Modulliste", async ({ page }) => {
  await page.fill("#modulsuche", "Fahrtenbuch");
  await expect(page.locator("#treffer")).toContainText("1 Modul");
  await expect(page.locator(".modul h3")).toHaveText(["Fahrtenbuch"]);
});

test("Kategorie-Filter schränkt die Ergebnisse ein", async ({ page }) => {
  const gesamt = await page.locator(".modul").count();
  await page.locator('.chip[data-cat="lager"]').click();
  const gefiltert = await page.locator(".modul").count();
  expect(gefiltert).toBeGreaterThan(0);
  expect(gefiltert).toBeLessThan(gesamt);
});

test("Kaufen/Mieten-Umschalter ändert die angezeigten Preise", async ({ page }) => {
  const kaufPreis = await page.locator(".modul-preis b").first().innerText();
  await page.locator('.modell-btn[data-modell="miete"]').click();
  const mietPreis = await page.locator(".modul-preis b").first().innerText();
  expect(mietPreis).not.toBe(kaufPreis);
  await expect(page.locator(".modell-hinweis .nur-miete")).toBeVisible();
});

test("Modul hinzufügen aktualisiert die Kostenschätzung und aktiviert den PDF-Knopf", async ({ page }) => {
  await expect(page.locator("#rechnerleer")).toBeVisible();
  await page.locator('.modul[data-id="crm"] .modul-btn').click();
  await expect(page.locator("#rechnerleer")).toBeHidden();
  await expect(page.locator("#rechnersumme")).not.toHaveText("–");
  await expect(page.locator("#angebotBtn")).toBeEnabled();
});

test("löscht die Auswahl vollständig über Auswahl zurücksetzen", async ({ page }) => {
  await page.locator('.modul[data-id="crm"] .modul-btn').click();
  await page.locator('.modul[data-id="zeiterfassung"] .modul-btn').click();
  await page.locator("#rechnerleeren").click();
  await expect(page.locator("#rechnerleer")).toBeVisible();
  await expect(page.locator("#angebotBtn")).toBeDisabled();
});

test("Angebot als PDF: lokaler Download funktioniert ohne Versand", async ({ page }) => {
  await page.locator('.modul[data-id="crm"] .modul-btn').click();
  await page.locator("#angebotBtn").click();
  await expect(page.locator("#angebotDialog")).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.locator("#angebotLaden").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/Angebot-.*Hahne-Digital\.pdf/);
});

test("Anleitung- und Demo-Knöpfe öffnen die richtigen Zielseiten in neuem Tab", async ({ page, context }) => {
  const [anleitungSeite] = await Promise.all([
    context.waitForEvent("page"),
    page.locator('.modul[data-id="crm"] .anleitung-btn').click()
  ]);
  await anleitungSeite.waitForLoadState();
  expect(anleitungSeite.url()).toContain("anleitung.html?modul=crm");
  await anleitungSeite.close();

  const [demoSeite] = await Promise.all([
    context.waitForEvent("page"),
    page.locator('.modul[data-id="crm"] .demo-btn').click()
  ]);
  await demoSeite.waitForLoadState();
  expect(demoSeite.url()).toContain("demo.html?modul=crm");
  await demoSeite.close();
});

test("übernimmt eine geprüfte Wunschdomain sichtbar in die Kostenschätzung", async ({ page }) => {
  await page.route(/cloudflare-dns\.com/, (route) =>
    route.fulfill({ status: 200, contentType: "application/dns-json", body: JSON.stringify({ Status: 3, Answer: [] }) })
  );
  await page.locator('.modul[data-id="crm"] .modul-btn').click();
  await page.locator("#domEingabe").fill("testfirma-eckernfoerde.de");
  await page.locator(".dom-knopf").click();
  await page.locator(".dom-uebernehmen").click();
  await expect(page.locator("[data-domain-anzeige]").first()).toContainText("testfirma-eckernfoerde.de");
});
