const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

async function forAllBrowsers(pages, action) {
    const results = [];
    for (const [browserType, page] of pages.entries()) {
        try {
            const result = await action(page, browserType);
            results.push({ browserType, result, success: true });
        } catch (error) {
            results.push({ browserType, error, success: false });
            console.error(`${browserType} browser'ında hata:`, error);
        }
    }
    return results;
}

Given('Kullanıcı login sayfasına gider', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });
});

When('Email alanına {string} girer', async function (email) {
    this.testData = this.testData || {};
    this.testData.email = email;
});

When('Şifre alanına {string} girer', async function (password) {
    this.testData = this.testData || {};
    this.testData.password = password;
});

When('Login butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(this.testData.email, this.testData.password);
    });
});

Then('Kullanıcı başarıyla giriş yapmış olmalı', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        await expect(await loginPage.isLoggedIn()).toBeTruthy();
    });
});

Then('{string} hata mesajı görünmeli', async function (errorMessage) {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        const actualError = await loginPage.getErrorMessage();
        expect(actualError).toContain(errorMessage);
    });
});

Then('{string} yazısı görünür olmalı', async function (text) {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        await page.waitForLoadState('networkidle');
        const locator = page.locator(`text=${text}`);
        await expect(locator).toBeVisible({ timeout: 30000 });
    });
}); 