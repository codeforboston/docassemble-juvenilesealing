
Feature: Download PDF

# After I am found to be eligible, I should be able to download the
# PDF here.

Scenario: Qualify for sealing and elect to finish by hand

    Given I start the petitioner interview
    Then I click the button "Next "
    Then I click the button "Yes"
    Then I click the button "Yes"
    Then I click the button "No"
    Then I click the button "No"
    Then I click the button "No"
    Then I click the button "No"
    Then I click the button "No"
    Then I click the button "No"
    Then I click the button "No"
    Then I click the button "Finish by hand   "
    Then I should see the phrase "sealing-form.pdf has been created for you"
    Then I click the link "Download"
    Then I wait 10 seconds
