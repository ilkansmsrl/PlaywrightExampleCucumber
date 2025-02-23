const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductPage = require('../../pages/ProductPage');
const { forAllBrowsers } = require('../support/common');

// Given ve Then adımları add_to_cart.steps.js ile aynı olduğu için tekrar tanımlamıyoruz

Then('Tüm ürünlerin listelendiğini doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        const areProductsVisible = await productPage.verifyAllProductsVisible();
        expect(areProductsVisible).toBeTruthy();
    });
});

When('View Product butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        await productPage.clickViewProduct();
    });
});

Then('Ürün detay sayfasının açıldığını doğrular', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        const isDetailPageVisible = await productPage.verifyProductDetailPage();
        expect(isDetailPageVisible).toBeTruthy();
    });
});

When('Ürün miktarını {string} olarak artırır', async function (quantity) {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        await productPage.setProductQuantity(quantity);
    });
});

Then('Ürün miktarının {string} olduğunu doğrular', async function (expectedQuantity) {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        const isQuantityCorrect = await productPage.verifyCartQuantity(expectedQuantity);
        expect(isQuantityCorrect).toBeTruthy();
    });
});

When('Add to cart butonuna tıklar', async function () {
    await forAllBrowsers(this.pages, async (page) => {
        const productPage = new ProductPage(page);
        await productPage.addToCartFromDetail();
    });
}); 