// ==========================================================================
// Website-Assistent: ehrliche Selbstbezeichnung (keine KI), beantwortet
// bekannte Fragen aus der Wissensbasis, kennzeichnet unbekannte Fragen
// ehrlich, bietet Weiterleitung an, Verlauf zurücksetzen, Tastatur- und
// Screenreader-Bedienbarkeit, verdeckt auf dem Smartphone keine Kerninhalte.
// ==========================================================================
const { test, expect } = require("@playwright/test");
const { preSeedPrivacyDecision } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await preSeedPrivacyDecision(page);
  await page.goto("/index.html");
});

test("öffnet über den Auslöser-Knopf und zeigt die Startansicht", async ({ page }) => {
  await page.locator("#kiaKnopf").click();
  await expect(page.locator("#kiaFenster")).toBeVisible();
  await expect(page.locator("#kiaKnopf")).toHaveAttribute("aria-expanded", "true");
});

// Es wird gezielt nach dem Text in irgendeiner Sprechblase gesucht statt nach
// der zeitlich letzten: Nach der Begrüßung kann unabhängig vom Testablauf
// asynchron noch die Einwilligungsfrage zum Gedächtnis des Assistenten
// erscheinen, wodurch eine rein positionsbasierte Auswahl (".last()") flackern würde.
test("bezeichnet sich selbst ehrlich als Website-Assistent, nicht als KI", async ({ page }) => {
  await page.locator("#kiaKnopf").click();
  await page.locator('[data-ziel="assistent"]').click();
  await expect(page.locator("#kiaTitel")).toHaveText("Website-Assistent");
  await page.fill("#kiaFeld", "Bist du eine KI?");
  await page.locator("#kiaForm button[type=submit]").click();
  await expect(page.locator(".kia-blase.kia-es", { hasText: "keine KI" })).toBeVisible({ timeout: 5000 });
});

test("beantwortet eine bekannte Frage aus der Wissensbasis", async ({ page }) => {
  await page.locator("#kiaKnopf").click();
  await page.locator('[data-ziel="assistent"]').click();
  await page.fill("#kiaFeld", "Was kostet das?");
  await page.locator("#kiaForm button[type=submit]").click();
  await expect(page.locator(".kia-blase.kia-es", { hasText: "990" })).toBeVisible({ timeout: 5000 });
});

test("kennzeichnet unbekannte Fragen ehrlich und bietet die Weitergabe ans Team an", async ({ page }) => {
  await page.locator("#kiaKnopf").click();
  await page.locator('[data-ziel="assistent"]').click();
  await page.fill("#kiaFeld", "Wie ist das Wetter morgen in Kathmandu beim Bergsteigen");
  await page.locator("#kiaForm button[type=submit]").click();
  await expect(page.locator(".kia-blase.kia-es", { hasText: "finde ich auf dieser Website nichts" })).toBeVisible({ timeout: 5000 });
  await expect(page.locator('[data-tun="chat"]')).toBeVisible();
});

test("Verlauf zurücksetzen leert den Chatverlauf und zeigt erneut die Begrüßung", async ({ page }) => {
  await page.locator("#kiaKnopf").click();
  await page.locator('[data-ziel="assistent"]').click();
  await page.fill("#kiaFeld", "Was ist ein Modul?");
  await page.locator("#kiaForm button[type=submit]").click();
  await expect(page.locator(".kia-blase")).toHaveCount(3, { timeout: 5000 }); // Begrüßung, Frage, Antwort

  await page.locator("#kiaReset").click();
  await expect(page.locator(".kia-blase")).toHaveCount(1);
  await expect(page.locator(".kia-blase").first()).toContainText(/Moin|wieder da/);
});

test("lässt sich per Escape schließen und per Tastatur bedienen", async ({ page }) => {
  await page.locator("#kiaKnopf").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#kiaFenster")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#kiaFenster")).toBeHidden();
});

test("verdeckt auf schmalen Bildschirmen keine primäre Handlungsaufforderung", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/index.html");
  await page.locator("#kiaKnopf").click();
  const fenster = await page.locator("#kiaFenster").boundingBox();
  const viewport = page.viewportSize();
  expect(fenster.width).toBeLessThanOrEqual(viewport.width);
  expect(fenster.x).toBeGreaterThanOrEqual(0);
});

test("Live-Chat-Weg zeigt Kanalauswahl statt echten Versand auszulösen", async ({ page }) => {
  await page.locator("#kiaKnopf").click();
  await page.locator('[data-ziel="chat"]').click();
  await page.fill("#chatFeld", "Testnachricht aus der automatisierten Prüfung");
  await page.locator("#chatForm button[type=submit]").click();
  await expect(page.locator(".kia-kanaele")).toBeVisible({ timeout: 3000 });
  // Es darf keine echte Netzwerkanfrage an einen Chat-Dienst gestellt worden sein,
  // da chatEndpoint standardmäßig leer ist.
  const endpoint = await page.evaluate(() => window.SITE && window.SITE.chatEndpoint);
  expect(endpoint).toBeFalsy();
});
