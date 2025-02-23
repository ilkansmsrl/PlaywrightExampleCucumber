const { Before, After, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

Before(async function () {
    // Her senaryo öncesi yeni bir browser ve context oluştur
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (scenario) {
    // Senaryo başarısız olursa ekran görüntüsü al
    if (scenario.result.status === Status.FAILED) {
        const buffer = await this.page.screenshot({
            path: `reports/screenshots/${scenario.pickle.name.replace(/\s+/g, '-')}-failed.png`,
            fullPage: true
        });
        await this.attach(buffer, 'image/png');
    }
    // Her senaryo sonrası browser'ı kapat
    await this.browser.close();
}); 