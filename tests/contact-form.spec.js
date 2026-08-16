// ==========================================================================
// Kontaktformular: Validierung, Honeypot, doppeltes Absenden, erfolgreicher
// und fehlerhafter serverseitiger Versand (per Mock, ohne echten Netzwerk-
// oder E-Mail-Versand), ehrlicher mailto-Hinweis ohne Server.
// ==========================================================================
const { test, expect } = require("@playwright/test");
const { blockExternalSideEffects, preSeedPrivacyDecision } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await blockExternalSideEffects(page);
  await preSeedPrivacyDecision(page);
  await page.goto("/index.html#kontakt");
});

async function gueltigAusfuellen(page) {
  await page.fill("#name", "Muster GmbH");
  await page.fill("#email", "test@example.com");
  await page.fill("#message", "Wir brauchen ein neues Kundenverwaltungssystem für unseren Betrieb.");
  await page.check("#consent");
}

test("zeigt verständliche Fehlermeldungen bei leerem Formular", async ({ page }) => {
  await page.locator("#submitBtn").click();
  await expect(page.locator("#name-err")).not.toBeEmpty();
  await expect(page.locator("#email-err")).not.toBeEmpty();
  await expect(page.locator("#message-err")).not.toBeEmpty();
  await expect(page.locator("#consent-err")).not.toBeEmpty();
  await expect(page.locator("#formstatus")).toContainText("markierten Felder");
});

test("weist eine ungültige E-Mail-Adresse zurück", async ({ page }) => {
  await page.fill("#name", "Max Mustermann");
  await page.fill("#email", "keine-email");
  await page.fill("#message", "Kurzer Testtext mit ausreichend Zeichen.");
  await page.check("#consent");
  await page.locator("#submitBtn").click();
  await expect(page.locator("#email-err")).not.toBeEmpty();
});

test("Honeypot-Feld verhindert die Übermittlung, ohne Fehler zu zeigen", async ({ page }) => {
  await gueltigAusfuellen(page);
  await page.locator("#website").fill("http://spam.example");
  await page.locator("#submitBtn").click();
  await expect(page.locator("#formstatus")).not.toHaveClass(/show/);
});

test("ohne konfigurierten Server-Endpoint öffnet das Formular ehrlich das E-Mail-Programm", async ({ page }) => {
  const hatEndpoint = await page.evaluate(() => !!(window.SITE && window.SITE.formEndpoint));
  expect(hatEndpoint).toBe(false);
  await gueltigAusfuellen(page);
  await page.locator("#submitBtn").click();
  await expect(page.locator("#formstatus")).toContainText("E-Mail-Programm geöffnet");
});

test("erfolgreicher serverseitiger Versand (gemockter Endpoint) zeigt echte Bestätigung erst nach Erfolg", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
  );
  await page.evaluate(() => { window.SITE.formEndpoint = "/api/contact"; });

  await gueltigAusfuellen(page);
  await expect(page.locator("#formstatus")).not.toHaveClass(/show/);
  await page.locator("#submitBtn").click();
  await expect(page.locator("#formstatus")).toContainText("eingegangen");
  await expect(page.locator("#name")).toHaveValue("");
});

test("fehlgeschlagener serverseitiger Versand zeigt eine ehrliche Fehlermeldung, keinen falschen Erfolg", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 422, contentType: "application/json", body: JSON.stringify({ ok: false, error: "Zustimmung fehlt." }) })
  );
  await page.evaluate(() => { window.SITE.formEndpoint = "/api/contact"; });

  await gueltigAusfuellen(page);
  await page.locator("#submitBtn").click();
  await expect(page.locator("#formstatus")).not.toContainText("eingegangen");
  await expect(page.locator("#formstatus")).toContainText("Zustimmung fehlt");
  await expect(page.locator("#formstatus")).toContainText("service@hd-hahne.de");
});

test("verhindert doppeltes Absenden während einer laufenden Anfrage", async ({ page }) => {
  let aufrufe = 0;
  await page.route("**/api/contact", async (route) => {
    aufrufe++;
    await new Promise((r) => setTimeout(r, 300));
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });
  await page.evaluate(() => { window.SITE.formEndpoint = "/api/contact"; });
  await gueltigAusfuellen(page);

  const knopf = page.locator("#submitBtn");
  await knopf.click();
  await expect(knopf).toBeDisabled();
  await knopf.click({ force: true }); // zweiter Klick während "wird gesendet"
  await expect(page.locator("#formstatus")).toContainText("eingegangen");
  expect(aufrufe).toBe(1);
});
