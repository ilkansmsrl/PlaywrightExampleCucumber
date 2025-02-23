Feature: Verify Product Quantity in Cart Functionality

  Scenario: Verify product quantity in cart
    Given Kullanıcı anasayfaya gider
    Then Anasayfanın başarıyla görüntülendiğini doğrular
    When Products butonuna tıklar
    Then Tüm ürünlerin listelendiğini doğrular
    When View Product butonuna tıklar
    Then Ürün detay sayfasının açıldığını doğrular
    When Ürün miktarını "4" olarak artırır
    And Add to cart butonuna tıklar
    And View Cart butonuna tıklar
    Then Ürün miktarının "4" olduğunu doğrular 