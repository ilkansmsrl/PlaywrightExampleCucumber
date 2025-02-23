Feature: Login User Functionality

  Scenario: Login with correct email and password
    Given Kullanıcı anasayfaya gider
    Then Anasayfanın başarıyla görüntülendiğini doğrular
    When Signup Login butonuna tıklar
    Then Login to your account yazısının görünür olduğunu doğrular
    When Email alanına "test123@test.com" girer
    And Password alanına "test123" girer
    And Login butonuna tıklar
    Then Logged in as username yazısının görünür olduğunu doğrular
    When Delete Account butonuna tıklar
    Then ACCOUNT DELETED! yazısının görünür olduğunu doğrular 