const { Before, After, Status } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const browserConfig = require('../../config/browser.config');

class BrowserManager {
    constructor() {
        this.browsers = new Map();
        this.contexts = new Map();
        this.pages = new Map();
    }

    async launchBrowser(browserType, config) {
        try {
            const playwright = { chromium, firefox, webkit };
            const browser = await playwright[browserType].launch({
                headless: config.headless,
                ...browserConfig.launchOptions,
                timeout: 30000
            });
            
            const context = await browser.newContext({
                ...browserConfig.contextOptions,
                viewport: config.viewport,
                timeout: 30000
            });
            
            const page = await context.newPage();

            this.browsers.set(browserType, browser);
            this.contexts.set(browserType, context);
            this.pages.set(browserType, page);

            return { browser, context, page };
        } catch (error) {
            console.error(`Failed to launch ${browserType}: ${error.message}`);
            throw error;
        }
    }

    async closeAll() {
        for (const [browserType, browser] of this.browsers.entries()) {
            try {
                await browser.close();
            } catch (error) {
                console.error(`Failed to close ${browserType}: ${error.message}`);
            }
        }
    }

    getActiveBrowsers() {
        return Object.entries(browserConfig.browsers)
            .filter(([_, config]) => config.enabled)
            .map(([name, _]) => name);
    }
}

Before(async function() {
    this.browserManager = new BrowserManager();
    const activeBrowsers = this.browserManager.getActiveBrowsers();

    try {
        for (const browserType of activeBrowsers) {
            await this.browserManager.launchBrowser(browserType, browserConfig.browsers[browserType]);
        }
        this.pages = this.browserManager.pages;
        this.currentPage = this.pages.get('chromium');
    } catch (error) {
        console.error('Browser başlatma hatası:', error);
        throw error;
    }
});

After(async function(scenario) {
    try {
        if (scenario.result.status === Status.FAILED) {
            for (const [browserType, page] of this.pages.entries()) {
                if (page && !page.isClosed()) {
                    const buffer = await page.screenshot({
                        path: `reports/screenshots/${scenario.pickle.name.replace(/\s+/g, '-')}-${browserType}-failed.png`,
                        fullPage: true
                    });
                    await this.attach(buffer, 'image/png');
                }
            }
        }
    } catch (error) {
        console.error('Screenshot alma hatası:', error);
    } finally {
        await this.browserManager.closeAll();
    }
}); 