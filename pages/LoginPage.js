const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput = 'input[data-qa="login-email"]';
        this.passwordInput = 'input[data-qa="login-password"]';
        this.loginButton = 'button[data-qa="login-button"]';
        this.errorMessage = '//section[@id="form"]//form[@action="/login"]/p[contains(text(), "Your email or password is incorrect!")]';
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
}

module.exports = LoginPage; 