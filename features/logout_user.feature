Feature: Logout User Functionality

  Scenario: Successfully logout from the application
    Given Kullanıcı anasayfaya gider
    Then Anasayfanın başarıyla görüntülendiğini doğrular
    When Signup Login butonuna tıklar
    Then Login to your account yazısının görünür olduğunu doğrular
    When Email alanına "test123@test.com" girer
    And Password alanına "test123" girer
    And Login butonuna tıklar
    Then Logged in as username yazısının görünür olduğunu doğrular
    When Logout butonuna tıklar
    Then Login sayfasının görüntülendiğini doğrular 