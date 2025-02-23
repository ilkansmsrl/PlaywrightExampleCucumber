const BasePage = require('./BasePage');

class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
        // Locator'lar
        this.signupLoginButton = 'a[href="/login"]';
        this.newUserSignupText = 'div.signup-form h2';
        this.nameInput = 'input[data-qa="signup-name"]';
        this.emailInput = 'input[data-qa="signup-email"]';
        this.signupButton = 'button[data-qa="signup-button"]';
        this.accountInfoText = 'div.login-form h2.title';
        this.titleRadio = '#id_gender1';
        this.passwordInput = 'input[data-qa="password"]';
        this.daysSelect = '#days';
        this.monthsSelect = '#months';
        this.yearsSelect = '#years';
        this.newsletterCheckbox = '#newsletter';
        this.specialOffersCheckbox = '#optin';
        this.firstNameInput = 'input[data-qa="first_name"]';
        this.lastNameInput = 'input[data-qa="last_name"]';
        this.companyInput = 'input[data-qa="company"]';
        this.address1Input = 'input[data-qa="address"]';
        this.address2Input = 'input[data-qa="address2"]';
        this.countrySelect = 'select[data-qa="country"]';
        this.stateInput = 'input[data-qa="state"]';
        this.cityInput = 'input[data-qa="city"]';
        this.zipcodeInput = 'input[data-qa="zipcode"]';
        this.mobileNumberInput = 'input[data-qa="mobile_number"]';
        this.createAccountButton = 'button[data-qa="create-account"]';
        this.accountCreatedText = 'h2.title';
        this.continueButton = 'a[data-qa="continue-button"]';
        this.loggedInText = 'a:has-text("Logged in as")';
        this.deleteAccountButton = 'a[href="/delete_account"]';
        this.accountDeletedText = 'h2.title';
    }

    async clickSignupLoginButton() {
        await this.page.click(this.signupLoginButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyNewUserSignupVisible() {
        const text = await this.page.locator(this.newUserSignupText).textContent();
        return text.includes('New User Signup!');
    }

    async enterName(name) {
        await this.page.fill(this.nameInput, name);
    }

    async enterEmail(email) {
        await this.page.fill(this.emailInput, email);
    }

    async clickSignupButton() {
        await this.page.click(this.signupButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyAccountInfoVisible() {
        const text = await this.page.locator(this.accountInfoText).textContent();
        return text.includes('ENTER ACCOUNT INFORMATION');
    }

    async selectTitle() {
        await this.page.click(this.titleRadio);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async selectDateOfBirth() {
        await this.page.selectOption(this.daysSelect, '1');
        await this.page.selectOption(this.monthsSelect, '1');
        await this.page.selectOption(this.yearsSelect, '2000');
    }

    async checkNewsletter() {
        await this.page.check(this.newsletterCheckbox);
    }

    async checkSpecialOffers() {
        await this.page.check(this.specialOffersCheckbox);
    }

    async fillAddressInfo(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobile) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.companyInput, company);
        await this.page.fill(this.address1Input, address1);
        await this.page.fill(this.address2Input, address2);
        await this.page.selectOption(this.countrySelect, country);
        await this.page.fill(this.stateInput, state);
        await this.page.fill(this.cityInput, city);
        await this.page.fill(this.zipcodeInput, zipcode);
        await this.page.fill(this.mobileNumberInput, mobile);
    }

    async clickCreateAccountButton() {
        await this.page.click(this.createAccountButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyAccountCreated() {
        const text = await this.page.locator(this.accountCreatedText).textContent();
        return text.includes('ACCOUNT CREATED!');
    }

    async clickContinueButton() {
        await this.page.click(this.continueButton);
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

module.exports = RegisterPage; 