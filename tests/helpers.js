// ==========================================================================
// HAHNE DIGITAL – Test-Hilfsfunktionen
// --------------------------------------------------------------------------
// blockExternalSideEffects() verhindert, dass ein Testlauf jemals eine
// echte Nachricht, E-Mail oder WhatsApp-Nachricht auslöst: jede Navigation
// zu mailto:/tel:/wa.me/whatsapp wird abgefangen, statt sie auszuführen.
// Die Cloudflare-DNS-Abfrage der Domainprüfung ist lesend (kein Versand)
// und wird bewusst NICHT blockiert, damit der reale Ablauf getestet wird –
// Tests, die keine Netzwerkschwankung riskieren wollen, mocken sie gezielt.
// ==========================================================================
async function collectConsoleErrors(page) {
  const errors = [];
  page.on("pageerror", (err) => errors.push("pageerror: " + err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push("console.error: " + msg.text());
  });
  return errors;
}

async function blockExternalSideEffects(page) {
  await page.route(/^mailto:/, (route) => route.abort());
  await page.route(/^tel:/, (route) => route.abort());
  await page.route(/wa\.me|whatsapp\.com/, (route) => route.abort());
}

// Für Tests, die NICHT den Datenschutzdialog selbst prüfen: die Entscheidung
// gilt als bereits getroffen, damit die Hinweisleiste (wie bei jedem
// wiederkehrenden Besucher) nicht im Weg steht. Läuft vor jeder Navigation
// dieser Seite, weil addInitScript für die gesamte Page-Lebensdauer gilt.
async function preSeedPrivacyDecision(page) {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "hd_privatsphaere",
      JSON.stringify({ wahl: "nichts", zeitpunkt: new Date().toISOString(), fassung: 1 })
    );
  });
}

module.exports = { collectConsoleErrors, blockExternalSideEffects, preSeedPrivacyDecision };
