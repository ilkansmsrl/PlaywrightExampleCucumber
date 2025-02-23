const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductPage = require('../../pages/ProductPage');
const { forAllBrowsers } = require('../support/common');

Given('Kullanıcı anasayfaya gider', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        await page.goto('https://automationexercise.com');
    });
});

Then('Anasayfanın başarıyla görüntülendiğini doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
    });
});

When('Products butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        await productPage.clickProductsButton();
    });
});

When('İlk ürünün üzerine gelir ve Add to cart butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        await productPage.addFirstProductToCart();
    });
});

When('Continue Shopping butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        await productPage.clickContinueShopping();
    });
});

When('İkinci ürünün üzerine gelir ve Add to cart butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        await productPage.addSecondProductToCart();
    });
});

When('View Cart butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        await productPage.clickViewCart();
    });
});

Then('Her iki ürünün sepete eklendiğini doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        const productsInCart = await productPage.verifyProductsInCart();
        expect(productsInCart).toBeTruthy();
    });
});

Then('Ürünlerin fiyatlarını, miktarlarını ve toplam fiyatı doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        const details = await productPage.getProductDetails();
        
        // Fiyatların sayı olduğunu kontrol et
        expect(details.prices.length).toBe(2);
        expect(details.quantities.length).toBe(2);
        expect(details.totalPrices.length).toBe(2);
        
        // Her ürün için fiyat * miktar = toplam fiyat kontrolü
        for(let i = 0; i < 2; i++) {
            const price = parseFloat(details.prices[i].replace('Rs. ', ''));
            const quantity = parseInt(details.quantities[i]);
            const totalPrice = parseFloat(details.totalPrices[i].replace('Rs. ', ''));
            expect(price * quantity).toBe(totalPrice);
        }
    });
}); 