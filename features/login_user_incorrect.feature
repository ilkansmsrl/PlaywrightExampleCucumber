Feature: Login User with Incorrect Credentials Functionality

  Scenario: Login with incorrect email and password
    Given Kullanıcı anasayfaya gider
    Then Anasayfanın başarıyla görüntülendiğini doğrular
    When Signup Login butonuna tıklar
    Then Login to your account yazısının görünür olduğunu doğrular
    When Email alanına "incorrect@test.com" girer
    And Password alanına "incorrect123" girer
    And Login butonuna tıklar
    Then Your email or password is incorrect! hata mesajının görünür olduğunu doğrular 