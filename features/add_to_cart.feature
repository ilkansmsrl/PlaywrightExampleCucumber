Feature: Add Products in Cart Functionality

  Scenario: Add multiple products to cart
    Given Kullanıcı anasayfaya gider
    Then Anasayfanın başarıyla görüntülendiğini doğrular
    When Products butonuna tıklar
    And İlk ürünün üzerine gelir ve Add to cart butonuna tıklar
    And Continue Shopping butonuna tıklar
    And İkinci ürünün üzerine gelir ve Add to cart butonuna tıklar
    And View Cart butonuna tıklar
    Then Her iki ürünün sepete eklendiğini doğrular
    And Ürünlerin fiyatlarını, miktarlarını ve toplam fiyatı doğrular 