Feature: Finish by hand

# ***TO DO - This is still a skeleton and needs to be completed.
#After I am found to be eligible, if I click the "Finish by hand" button,
#I should be taken to the correct page.
#If I click continue on that page, I should be taken to the final page.
#
#

# https://stackoverflow.com/questions/247135/using-xpath-to-search-text-containing-nbsp

Scenario: Qualify for sealing and elect to finish the
    Given I start the interview "docassemble.playground42:juvenile-sealing-intro-9.yml"
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
    Then I should see the phrase "juvenile-sealing-petition.pdf has been created for you"


