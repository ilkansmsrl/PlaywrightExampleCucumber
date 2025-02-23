class BasePage {
    constructor(page) {
        this.page = page;
        this.baseURL = 'https://automationexercise.com';
    }

    async navigate(path) {
        try {
            await this.page.goto(`${this.baseURL}${path}`, {
                waitUntil: 'networkidle',
                timeout: 30000
            });
            // Sayfa yüklenmesini bekle
            await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
        } catch (error) {
            console.error(`Navigation failed: ${error.message}`);
            throw error;
        }
    }
}

module.exports = BasePage; 