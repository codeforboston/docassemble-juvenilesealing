Feature: Docket sheet question regular flow

# Description:
# Regular interview flow for docket sheets question
# with non-yes answers.

# Steps:
# 1. √ Get to docket question
# 2. √ Select 'No' as the answer
# 3. √ See first docket sheets informational page
# 4a. √ Select to go back to form (go to 5)
# 4b. √ Select to see more
# 4b1. √ See second informational page
# 4b1. √ Select to go back to form (go to 5)
# 4b2. √ Select to exit
# 4b2a. √ Finish - Exit
# 5. √ Finish - See 'open cases' question

# Same for 'I don't know'

Scenario: Use interview "No" answer flow path to see first page of docket sheets info
    Given I start the interview "docassemble.playground42juvenilesealing%3Apetitioner-entrypoint-10.yml"
    Then I click the button "Next "
    Then I click the button "Yes"
    Then I click the button "No"
    Then I should see the phrase "WHY GET DOCKET SHEETS?"
    Then I click the button "No, take me back to the form"
    Then I should see the phrase "YOUR OPEN CASES"

Scenario: Use interview "No" answer flow path to see second page of docket sheets info
    Given I start the interview "docassemble.playground42juvenilesealing%3Apetitioner-entrypoint-10.yml"
    Then I click the button "Next "
    Then I click the button "Yes"
    Then I click the button "No"
    Then I should see the phrase "WHY GET DOCKET SHEETS?"
    Then I click the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    Then I click the button "I want to keep going with the form "
    Then I should see the phrase "YOUR OPEN CASES"

Scenario: Use interview "No" answer flow path to exit from the second page of docket sheets info
    Given I start the interview "docassemble.playground42juvenilesealing%3Apetitioner-entrypoint-10.yml"
    Then I click the button "Next "
    Then I click the button "Yes"
    Then I click the button "No"
    Then I should see the phrase "WHY GET DOCKET SHEETS?"
    Then I click the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    Then I click the button "I will come back to the form after ordering my docket sheets "
    Then I should see the phrase "THANK YOU FOR COMING"


################


Scenario: Use interview "I don't know" answer flow path to see first page of docket sheets info
    Given I start the interview "docassemble.playground42juvenilesealing%3Apetitioner-entrypoint-10.yml"
    Then I click the button "Next "
    Then I click the button "Yes"
    Then I click the button "No"
    Then I should see the phrase "WHY GET DOCKET SHEETS?"
    Then I click the button "No, take me back to the form"
    Then I should see the phrase "YOUR OPEN CASES"

Scenario: Use interview "I don't know" answer flow path to see second page of docket sheets info
    Given I start the interview "docassemble.playground42juvenilesealing%3Apetitioner-entrypoint-10.yml"
    Then I click the button "Next "
    Then I click the button "Yes"
    Then I click the button "No"
    Then I should see the phrase "WHY GET DOCKET SHEETS?"
    Then I click the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    Then I click the button "I want to keep going with the form "
    Then I should see the phrase "YOUR OPEN CASES"

Scenario: Use interview "I don't know" answer flow path to exit from the second page of docket sheets info
    Given I start the interview "docassemble.playground42juvenilesealing%3Apetitioner-entrypoint-10.yml"
    Then I click the button "Next "
    Then I click the button "Yes"
    Then I click the button "No"
    Then I should see the phrase "WHY GET DOCKET SHEETS?"
    Then I click the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    Then I click the button "I will come back to the form after ordering my docket sheets "
    Then I should see the phrase "THANK YOU FOR COMING"
 