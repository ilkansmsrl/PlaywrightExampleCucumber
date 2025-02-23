Feature: Register User Functionality

  Scenario: Register new user with valid information
    Given Kullanıcı anasayfaya gider
    Then Anasayfanın başarıyla görüntülendiğini doğrular
    When Signup Login butonuna tıklar
    Then New User Signup yazısının görünür olduğunu doğrular
    When Name alanına "test user" girer
    And Email alanına "test123@test.com" girer
    And Signup butonuna tıklar
    Then ENTER ACCOUNT INFORMATION yazısının görünür olduğunu doğrular
    When Title seçer
    And Password alanına "test123" girer
    And Date of birth seçer
    And Newsletter checkbox'ını seçer
    And Special offers checkbox'ını seçer
    And First name alanına "test" girer
    And Last name alanına "user" girer
    And Company alanına "testcompany" girer
    And Address1 alanına "test address 1" girer
    And Address2 alanına "test address 2" girer
    And Country dropdown'ından ülke seçer
    And State alanına "test state" girer
    And City alanına "test city" girer
    And Zipcode alanına "12345" girer
    And Mobile number alanına "1234567890" girer
    And Create Account butonuna tıklar
    Then ACCOUNT CREATED! yazısının görünür olduğunu doğrular
    When Continue butonuna tıklar
    Then Logged in as username yazısının görünür olduğunu doğrular
    When Delete Account butonuna tıklar
    Then ACCOUNT DELETED! yazısının görünür olduğunu doğrular
    And Continue butonuna tıklar 