// ==========================================================================
// Projekt-Check: vier Fragen, Zurück-Navigation, Neu starten, Tastatur,
// verständliches und nicht-willkürliches Ergebnis, Übernahme ins Formular.
// ==========================================================================
const { test, expect } = require("@playwright/test");
const { preSeedPrivacyDecision } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await preSeedPrivacyDecision(page);
  await page.goto("/index.html#berater");
});

test("alle vier Fragen lassen sich per Maus beantworten und führen zu einem Ergebnis", async ({ page }) => {
  await expect(page.locator("#stepCount")).toHaveText("Frage 1 von 4");
  await page.locator('.question[data-q="1"] .option[data-val="process"]').click();
  await expect(page.locator("#stepCount")).toHaveText("Frage 2 von 4");
  await page.locator('.question[data-q="2"] .option[data-val="custom"]').click();
  await expect(page.locator("#stepCount")).toHaveText("Frage 3 von 4");
  await page.locator('.question[data-q="3"] .option[data-val="crm"]').click();
  await expect(page.locator("#stepCount")).toHaveText("Frage 4 von 4");
  await page.locator('.question[data-q="4"] .option[data-val="small"]').click();

  await expect(page.locator("#result")).toHaveClass(/show/);
  const ergebnis = await page.locator("#resultText").innerText();
  expect(ergebnis).toContain("Individuelles Firmenmodul");
  expect(ergebnis).toContain("Kunden und Aufträge");
});

test("die Empfehlung folgt der ersten Antwort, nicht dem Zufall (Determinismus über mehrere Läufe)", async ({ page }) => {
  async function laufDurch(zielAntwort) {
    // Nicht direkt erneut zur selben #berater-URL navigieren: Chromium behandelt eine
    // Navigation zur identischen URL (inkl. Hash) als No-Op und lädt die Seite nicht neu,
    // wodurch der Zustand vom vorherigen Durchlauf (Ergebnisanzeige) bestehen bliebe.
    await page.goto("/index.html");
    await page.locator("#berater").scrollIntoViewIfNeeded();
    await page.locator('.question[data-q="1"] .option[data-val="' + zielAntwort + '"]').click();
    await page.locator('.question[data-q="2"] .option').first().click();
    await page.locator('.question[data-q="3"] .option').first().click();
    await page.locator('.question[data-q="4"] .option').first().click();
    return page.locator("#resultText").innerText();
  }
  const web = await laufDurch("web");
  const shop = await laufDurch("shop");
  const ai = await laufDurch("ai");
  expect(web).toContain("Business Website");
  expect(shop).toContain("Shopsystem");
  expect(ai).toContain("KI-Integration");
  // dieselbe Eingabe ergibt zuverlässig dasselbe Ergebnis
  const webNochmal = await laufDurch("web");
  expect(webNochmal).toBe(web);
});

test("Zurück-Navigation funktioniert und behält die vorherige Auswahl bei", async ({ page }) => {
  await page.locator('.question[data-q="1"] .option[data-val="shop"]').click();
  await expect(page.locator("#stepCount")).toHaveText("Frage 2 von 4");
  await page.locator('.question[data-q="2"] .back').click();
  await expect(page.locator("#stepCount")).toHaveText("Frage 1 von 4");
  await expect(page.locator('.question[data-q="1"] .option[data-val="shop"]')).toHaveAttribute("aria-pressed", "true");
});

test("Neu starten löscht alle Werte und zeigt wieder Frage 1", async ({ page }) => {
  await page.locator('.question[data-q="1"] .option[data-val="ai"]').click();
  await page.locator('.question[data-q="2"] .option[data-val="open"]').click();
  await page.locator('.question[data-q="3"] .option[data-val="assistant"]').click();
  await page.locator('.question[data-q="4"] .option[data-val="mvp"]').click();
  await expect(page.locator("#result")).toHaveClass(/show/);

  await page.locator("#restart").click();
  await expect(page.locator("#result")).not.toHaveClass(/show/);
  await expect(page.locator("#stepCount")).toHaveText("Frage 1 von 4");
  await expect(page.locator('.question[data-q="1"] .option[aria-pressed="true"]')).toHaveCount(0);
});

test("ist vollständig mit der Tastatur bedienbar", async ({ page }) => {
  const ersteOption = page.locator('.question[data-q="1"] .option').first();
  await ersteOption.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#stepCount")).toHaveText("Frage 2 von 4");
  await page.locator('.question[data-q="2"] .option').first().focus();
  await page.keyboard.press(" ");
  await expect(page.locator("#stepCount")).toHaveText("Frage 3 von 4");
});

test("Ergebnis wird korrekt ins Kontaktformular übernommen", async ({ page }) => {
  await page.locator('.question[data-q="1"] .option[data-val="process"]').click();
  await page.locator('.question[data-q="2"] .option[data-val="system"]').click();
  await page.locator('.question[data-q="3"] .option[data-val="crm"]').click();
  await page.locator('.question[data-q="4"] .option[data-val="full"]').click();

  const nachricht = await page.locator("#message").inputValue();
  expect(nachricht).toContain("Ergebnis Projekt-Check");
  expect(nachricht).toContain("Individuelles Firmenmodul");
  const projektart = await page.locator("#type").inputValue();
  expect(projektart).toBe("Firmenmodul");

  await page.locator('a.btn.btn-primary[href="#kontakt"]').click();
  await expect(page.locator("#kontakt")).toBeInViewport();
});
