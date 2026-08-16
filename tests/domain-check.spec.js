// ==========================================================================
// Domainprüfung: ehrliche Bezeichnung als technische Vorprüfung, korrekte
// Behandlung ungültiger Eingaben, Umlaute/Punycode, Netzwerkausfall,
// und für "keine Einträge gefunden" NIE die Behauptung "Domain frei".
// ==========================================================================
const { test, expect } = require("@playwright/test");
const { preSeedPrivacyDecision } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await preSeedPrivacyDecision(page);
  await page.goto("/module.html#domain");
});

test("kennzeichnet sich selbst als technische Vorprüfung, nicht als verbindliche Auskunft", async ({ page }) => {
  await expect(page.locator("#domHinweis")).toContainText("technische Vorprüfung");
  await expect(page.locator(".sicht-ehrlich").first()).toContainText("technische Vorprüfung");
});

test("meldet einen verständlichen Fehler bei leerer Eingabe", async ({ page }) => {
  await page.locator(".dom-knopf").click();
  await expect(page.locator("#domErgebnis")).toContainText("Bitte etwas eingeben");
});

test("weist ungültige Zeichen und zu kurze Namen zurück", async ({ page }) => {
  await page.fill("#domEingabe", "!!invalid!!");
  await page.locator(".dom-knopf").click();
  await expect(page.locator("#domErgebnis")).toContainText("Das geht so nicht");
});

test("wandelt Umlautdomains nach Punycode um", async ({ page }) => {
  const ascii = await page.evaluate(() => window.DOMAIN.aufbereiten("müller-bau.de").ascii);
  expect(ascii).toBe("xn--mller-bau-q9a.de");
});

test('zeigt bei fehlenden DNS-Einträgen "Keine aktive Nutzung erkannt" statt "Domain frei"', async ({ page }) => {
  await page.route(/cloudflare-dns\.com/, (route) => {
    const url = route.request().url();
    const nxdomain = { Status: 3, Answer: [] };
    route.fulfill({ status: 200, contentType: "application/dns-json", body: JSON.stringify(nxdomain) });
  });
  await page.fill("#domEingabe", "ganz-sicher-frei-testdomain-xyz.de");
  await page.locator(".dom-knopf").click();
  const ergebnis = page.locator("#domErgebnis");
  await expect(ergebnis).toContainText("Keine aktive Nutzung erkannt");
  await expect(ergebnis).not.toContainText("ist frei");
  await expect(ergebnis).toContainText("Registrar bestätigt werden");
});

test("meldet eine vergebene Domain eindeutig, wenn DNS-Einträge bestehen", async ({ page }) => {
  await page.route(/cloudflare-dns\.com/, (route) => {
    const treffer = { Status: 0, Answer: [{ name: "google.de", type: 1, data: "142.250.0.1" }] };
    route.fulfill({ status: 200, contentType: "application/dns-json", body: JSON.stringify(treffer) });
  });
  await page.fill("#domEingabe", "google.de");
  await page.locator(".dom-knopf").click();
  await expect(page.locator("#domErgebnis")).toContainText("bereits vergeben");
});

test("behandelt einen Netzwerkausfall der Prüfung ohne Absturz und mit Handlungsempfehlung", async ({ page }) => {
  await page.route(/cloudflare-dns\.com/, (route) => route.abort("failed"));
  await page.fill("#domEingabe", "irgendeine-testdomain.de");
  await page.locator(".dom-knopf").click();
  await expect(page.locator("#domErgebnis")).toContainText("nicht möglich");
  await expect(page.locator("#domErgebnis")).toContainText("Kontaktformular");
});

test("übernimmt eine als frei gemeldete Domain korrekt ins Angebot", async ({ page }) => {
  await page.route(/cloudflare-dns\.com/, (route) => {
    route.fulfill({ status: 200, contentType: "application/dns-json", body: JSON.stringify({ Status: 3, Answer: [] }) });
  });
  await page.fill("#domEingabe", "neue-testfirma-eckernfoerde.de");
  await page.locator(".dom-knopf").click();
  await page.locator(".dom-uebernehmen").click();
  await expect(page.locator(".dom-uebernehmen")).toContainText("vorgemerkt");
  const gewaehlt = await page.evaluate(() => window.DOMAIN.gewaehlt());
  expect(gewaehlt).toBe("neue-testfirma-eckernfoerde.de");
});
