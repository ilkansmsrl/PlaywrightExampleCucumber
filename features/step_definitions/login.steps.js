const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('Kullanıcı login sayfasına gider', async function () {
    await this.page.goto('https://automationexercise.com/login');
});

When('Email alanına {string} girer', async function (email) {
    await this.page.fill('input[data-qa="login-email"]', email);
});

When('Şifre alanına {string} girer', async function (password) {
    await this.page.fill('input[data-qa="login-password"]', password);
});

When('Login butonuna tıklar', async function () {
    await this.page.click('button[data-qa="login-button"]');
});

Then('Kullanıcı başarıyla giriş yapmış olmalı', async function () {
    // Ana sayfaya yönlendirildiğini kontrol et
    await expect(this.page).toHaveURL('https://automationexercise.com/');
});

Then('{string} yazısı görünür olmalı', async function (text) {
    await expect(this.page.locator('text=' + text)).toBeVisible();
});

Then('{string} hata mesajı görünmeli', async function (errorMessage) {
    // XPath kullanarak hata mesajını kontrol ediyoruz
    const errorLocator = this.page.locator('//section[@id="form"]//form[@action="/login"]/p[contains(text(), "Your email or password is incorrect!")]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toHaveText(errorMessage);
}); 