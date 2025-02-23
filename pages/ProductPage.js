const BasePage = require('./BasePage');

class ProductPage extends BasePage {
    constructor(page) {
        super(page);
        this.productsButton = 'a[href="/products"]';
        this.firstProduct = '(//div[@class="product-image-wrapper"])[1]';
        this.secondProduct = '(//div[@class="product-image-wrapper"])[2]';
        this.addToCartButton = 'add-to-cart';
        this.continueShoppingButton = 'button[data-dismiss="modal"]';
        this.viewCartButton = 'p.text-center a[href="/view_cart"]';
        this.cartProducts = 'tbody tr';
        this.productPrices = 'td[class="cart_price"] p';
        this.productQuantities = 'td[class="cart_quantity"] button';
        this.productTotalPrices = 'td[class="cart_total"] p';
        this.viewProductButton = '//a[contains(text(), "View Product")][1]';
        this.productQuantityInput = '#quantity';
        this.productDetailAddToCartButton = 'button.cart';
        this.cartQuantity = '.cart_quantity button';
        this.allProducts = '.features_items .product-image-wrapper';
    }

    async clickProductsButton() {
        await this.page.click(this.productsButton);
        await this.page.waitForLoadState('networkidle');
    }

    async addFirstProductToCart() {
        try {
            // Ürünün görünür olmasını bekle
            await this.page.waitForSelector(this.firstProduct, { state: 'visible', timeout: 10000 });
            
            // Ürün üzerine gel
            await this.page.hover(this.firstProduct);
            
            // Add to cart butonunun görünür olmasını bekle
            const addToCartLocator = `${this.firstProduct}//a[contains(@class, "${this.addToCartButton}")]`;
            await this.page.waitForSelector(addToCartLocator, { state: 'visible', timeout: 5000 });
            
            // Butona tıkla
            await this.page.click(addToCartLocator);
            
            // Modal'ın görünür olmasını bekle
            await this.page.waitForSelector(this.continueShoppingButton, { state: 'visible', timeout: 5000 });
        } catch (error) {
            console.error('Add to cart error:', error);
            throw error;
        }
    }

    async addSecondProductToCart() {
        try {
            await this.page.waitForSelector(this.secondProduct, { state: 'visible', timeout: 10000 });
            await this.page.hover(this.secondProduct);
            
            const addToCartLocator = `${this.secondProduct}//a[contains(@class, "${this.addToCartButton}")]`;
            await this.page.waitForSelector(addToCartLocator, { state: 'visible', timeout: 5000 });
            
            await this.page.click(addToCartLocator);
            await this.page.waitForSelector(this.viewCartButton, { state: 'visible', timeout: 5000 });
        } catch (error) {
            console.error('Add second product error:', error);
            throw error;
        }
    }

    async clickContinueShopping() {
        await this.page.waitForSelector(this.continueShoppingButton, { state: 'visible', timeout: 5000 });
        await this.page.click(this.continueShoppingButton);
    }

    async clickViewCart() {
        await this.page.waitForSelector(this.viewCartButton, { state: 'visible', timeout: 5000 });
        await this.page.click(this.viewCartButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyProductsInCart() {
        await this.page.waitForSelector(this.cartProducts, { state: 'visible', timeout: 5000 });
        const cartItems = await this.page.locator(this.cartProducts).count();
        return cartItems === 2;
    }

    async getProductDetails() {
        await this.page.waitForSelector(this.productPrices, { state: 'visible', timeout: 5000 });
        const prices = await this.page.locator(this.productPrices).allTextContents();
        const quantities = await this.page.locator(this.productQuantities).allTextContents();
        const totalPrices = await this.page.locator(this.productTotalPrices).allTextContents();

        return {
            prices,
            quantities,
            totalPrices
        };
    }

    async verifyAllProductsVisible() {
        await this.page.waitForSelector(this.allProducts, { state: 'visible', timeout: 10000 });
        const productCount = await this.page.locator(this.allProducts).count();
        return productCount > 0;
    }

    async clickViewProduct() {
        await this.page.waitForSelector(this.viewProductButton, { state: 'visible', timeout: 10000 });
        await this.page.click(this.viewProductButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyProductDetailPage() {
        await this.page.waitForSelector(this.productQuantityInput, { state: 'visible', timeout: 10000 });
        return await this.page.isVisible(this.productQuantityInput);
    }

    async setProductQuantity(quantity) {
        await this.page.waitForSelector(this.productQuantityInput, { state: 'visible', timeout: 10000 });
        await this.page.fill(this.productQuantityInput, ''); // Önce mevcut değeri temizle
        await this.page.fill(this.productQuantityInput, quantity);
    }

    async addToCartFromDetail() {
        await this.page.click(this.productDetailAddToCartButton);
        await this.page.waitForSelector(this.viewCartButton, { state: 'visible', timeout: 10000 });
    }

    async verifyCartQuantity(expectedQuantity) {
        await this.page.waitForSelector(this.cartQuantity, { state: 'visible', timeout: 10000 });
        const quantity = await this.page.locator(this.cartQuantity).textContent();
        return quantity === expectedQuantity;
    }
}

module.exports = ProductPage; 