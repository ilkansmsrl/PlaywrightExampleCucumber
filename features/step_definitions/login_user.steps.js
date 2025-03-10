const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const { forAllBrowsers } = require('../support/common');

Then('Login to your account yazısının görünür olduğunu doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        const isVisible = await loginPage.verifyLoginTextVisible();
        expect(isVisible).toBeTruthy();
    });
});

When('Login butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickLoginButton();
    });
});

Then('Your email or password is incorrect! hata mesajının görünür olduğunu doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        const isErrorVisible = await loginPage.verifyIncorrectLoginError();
        expect(isErrorVisible).toBeTruthy();
    });
});

When('Logout butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickLogoutButton();
    });
});

Then('Login sayfasının görüntülendiğini doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const loginPage = new LoginPage(page);
        const isLoginPage = await loginPage.verifyLoginPage();
        expect(isLoginPage).toBeTruthy();
    });
});

// Not: Bazı step tanımlamaları register_user.steps.js ile ortak olduğu için tekrar tanımlamıyoruz 