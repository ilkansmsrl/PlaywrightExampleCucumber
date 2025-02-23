Feature: Login İşlemi
  Kullanıcı olarak automationexercise.com sitesine giriş yapabilmeliyim

  Scenario: Başarılı giriş
    Given Kullanıcı login sayfasına gider
    When Email alanına "ilkansmsrl@gmail.com" girer
    And Şifre alanına "Smsrl.123" girer
    And Login butonuna tıklar
    Then Kullanıcı başarıyla giriş yapmış olmalı
    And "Logged in as" yazısı görünür olmalı

  Scenario: Başarısız giriş
    Given Kullanıcı login sayfasına gider
    When Email alanına "yanlis@email.com" girer
    And Şifre alanına "yanlisSifre" girer
    And Login butonuna tıklar
    Then "Your email or password is incorrect!" hata mesajı görünmeli 