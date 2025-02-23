const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput = 'input[data-qa="login-email"]';
        this.passwordInput = 'input[data-qa="login-password"]';
        this.loginButton = 'button[data-qa="login-button"]';
        this.errorMessage = '//section[@id="form"]//form[@action="/login"]/p[contains(text(), "Your email or password is incorrect!")]';
        this.signupLoginButton = 'a[href="/login"]';
        this.loginText = '.login-form h2';
        this.loggedInText = 'a:has-text("Logged in as")';
        this.deleteAccountButton = 'a[href="/delete_account"]';
        this.accountDeletedText = 'h2.title';
    }

    async navigateToLogin() {
        await this.navigate('/login');
        await this.page.waitForSelector(this.emailInput, { state: 'visible' });
    }

    async login(email, password) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        const errorElement = this.page.locator(this.errorMessage);
        await errorElement.waitFor({ state: 'visible' });
        return await errorElement.textContent();
    }

    async isLoggedIn() {
        return await this.page.locator('text=Logged in as').isVisible();
    }

    async clickSignupLoginButton() {
        await this.page.click(this.signupLoginButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyLoginTextVisible() {
        const text = await this.page.locator(this.loginText).textContent();
        return text.includes('Login to your account');
    }

    async enterLoginEmail(email) {
        await this.page.fill(this.emailInput, email);
    }

    async enterLoginPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLoginButton() {
        await this.page.click(this.loginButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyLoggedInAsVisible() {
        return await this.page.isVisible(this.loggedInText);
    }

    async clickDeleteAccount() {
        await this.page.click(this.deleteAccountButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyAccountDeleted() {
        const text = await this.page.locator(this.accountDeletedText).textContent();
        return text.includes('ACCOUNT DELETED!');
    }
}

module.exports = LoginPage; 