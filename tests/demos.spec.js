// ==========================================================================
// Moduldemos: öffnen, suchen, filtern/sortieren, anlegen, bearbeiten
// (Statuswechsel), löschen MIT Sicherheitsabfrage, Demodaten zurücksetzen,
// Übernahme ins Angebot, deutliche Kennzeichnung als Musterdaten.
// ==========================================================================
const { test, expect } = require("@playwright/test");
const { preSeedPrivacyDecision } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await preSeedPrivacyDecision(page);
  await page.goto("/demo.html?modul=crm");
});

test("öffnet das gewählte Modul direkt über den Seitenaufruf", async ({ page }) => {
  await expect(page.locator("#demoTitel")).toHaveText("Kundenverwaltung (CRM)");
  await expect(page.locator(".demo-hinweis-probe")).toBeVisible();
});

test("die Modulliste lässt sich durchsuchen", async ({ page }) => {
  await page.fill("#demoSuche", "Fahrtenbuch");
  const eintraege = page.locator("#demoNavi .demo-eintrag");
  await expect(eintraege).toHaveCount(1);
  await expect(eintraege.first()).toContainText("Fahrtenbuch");
});

test("Tabelle lässt sich sortieren", async ({ page }) => {
  const ersteZeileVorher = await page.locator("#demoTabelle .demo-zeile").nth(1).innerText();
  await page.locator('.demo-sort[data-spalte="0"]').click();
  const ersteZeileNachher = await page.locator("#demoTabelle .demo-zeile").nth(1).innerText();
  await page.locator('.demo-sort[data-spalte="0"]').click(); // zweiter Klick kehrt die Richtung um
  const ersteZeileDritterKlick = await page.locator("#demoTabelle .demo-zeile").nth(1).innerText();
  expect([ersteZeileVorher, ersteZeileNachher, ersteZeileDritterKlick].every((z) => typeof z === "string")).toBe(true);
  expect(ersteZeileNachher).not.toBe(ersteZeileDritterKlick);
});

test("neuer Eintrag lässt sich anlegen", async ({ page }) => {
  const anzahlVorher = await page.locator("#demoAnzahl").innerText();
  await page.locator("[data-neu]").click();
  await page.locator('#demoNeu [data-f="0"]').fill("Test-Kunde Playwright");
  await page.locator("#demoNeu button[type=submit]").click();
  await expect(page.locator("#demoTabelle .demo-zeile").nth(1)).toContainText("Test-Kunde Playwright");
  const anzahlNachher = await page.locator("#demoAnzahl").innerText();
  expect(anzahlNachher).not.toBe(anzahlVorher);
});

test("Status eines Eintrags lässt sich ändern", async ({ page }) => {
  await page.locator("#demoTabelle .demo-zeile").nth(1).click();
  await expect(page.locator("#demoDetail")).toBeVisible();
  const chip = page.locator("#demoDetail .demo-chip").first();
  await chip.click();
  await expect(chip).toHaveClass(/an/);
});

test("löschen fragt zuerst sicher nach und bricht bei Ablehnen nichts ab", async ({ page }) => {
  const anzahlVorher = await page.locator("#demoTabelle .demo-zeile:not(.demo-titelzeile)").count();
  await page.locator("#demoTabelle .demo-zeile").nth(1).click();

  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain("wirklich löschen");
    dialog.dismiss();
  });
  await page.locator("[data-loeschen]").click();
  const anzahlNachAbbruch = await page.locator("#demoTabelle .demo-zeile:not(.demo-titelzeile)").count();
  expect(anzahlNachAbbruch).toBe(anzahlVorher);

  page.once("dialog", (dialog) => dialog.accept());
  await page.locator("[data-loeschen]").click();
  const anzahlNachLoeschen = await page.locator("#demoTabelle .demo-zeile:not(.demo-titelzeile)").count();
  expect(anzahlNachLoeschen).toBe(anzahlVorher - 1);
});

test("Demodaten zurücksetzen stellt den Ursprungszustand wieder her", async ({ page }) => {
  await page.locator("[data-neu]").click();
  await page.locator('#demoNeu [data-f="0"]').fill("Wird wieder verschwinden");
  await page.locator("#demoNeu button[type=submit]").click();
  await expect(page.locator("#demoTabelle")).toContainText("Wird wieder verschwinden");

  await page.locator("[data-zuruecksetzen]").click();
  await expect(page.locator("#demoTabelle")).not.toContainText("Wird wieder verschwinden");
});

test("Modul lässt sich ins Angebot übernehmen", async ({ page }) => {
  await page.locator("#demoVormerken").click();
  await expect(page).toHaveURL(/module\.html\?vormerken=crm#katalog/);
  await expect(page.locator(".auswahl-hinweis")).toContainText("CRM");
  await expect(page.locator('.modul[data-id="crm"]')).toHaveClass(/gewaehlt/);
});

test("Beispieldaten sind eindeutig als erfunden gekennzeichnet", async ({ page }) => {
  await expect(page.locator(".demo-app")).toContainText(/erfunden|Musterdaten/);
});

test("funktioniert auf Smartphone-Breite ohne horizontales Scrollen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demo.html?modul=crm");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator("#demoApp")).toBeVisible();
});
