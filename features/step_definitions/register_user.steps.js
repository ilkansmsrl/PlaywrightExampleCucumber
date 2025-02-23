const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RegisterPage = require('../../pages/RegisterPage');
const { forAllBrowsers } = require('../support/common');

When('Signup Login butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const registerPage = new RegisterPage(page);
        await registerPage.clickSignupLoginButton();
    });
});

Then('New User Signup yazısının görünür olduğunu doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const registerPage = new RegisterPage(page);
        const isVisible = await registerPage.verifyNewUserSignupVisible();
        expect(isVisible).toBeTruthy();
    });
});

When('Name alanına {string} girer', async function (name) {
    await forAllBrowsers(this.pages, async (page) => {
        const registerPage = new RegisterPage(page);
        await registerPage.enterName(name);
    });
});

When('Email alanına {string} girer', async function (email) {
    await forAllBrowsers(this.pages, async (page) => {
        const registerPage = new RegisterPage(page);
        await registerPage.enterEmail(email);
    });
});

When('Signup butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const registerPage = new RegisterPage(page);
        await registerPage.clickSignupButton();
    });
});

Then('ENTER ACCOUNT INFORMATION yazısının görünür olduğunu doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const registerPage = new RegisterPage(page);
        const isVisible = await registerPage.verifyAccountInfoVisible();
        expect(isVisible).toBeTruthy();
    });
});

// ... Diğer step tanımlamaları benzer şekilde devam edecek ... 