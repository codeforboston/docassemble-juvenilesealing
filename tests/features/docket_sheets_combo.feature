Feature: Link to docket sheets pages flow without affecting regular flow

# Description:
# Make sure that if the docket sheets 'read more'
# link is clicked and the user returns to the form,
# the answers 'No' and 'I don't know' still lead to
# the docket sheets info flow.

# Question: Will this be confusing for users? They
# may immediately assume they're stuck in a loop.
# Maybe it doesn't matter to flow that much - they'd
# probably find the way through it or a way around it,
# but will some people give up?

# Steps:
# 1. Get to docket question
# 2. Click on popover link
# 3. Select in popover
# 4a. Select return to form (go to 5)
# 4b. Select to see more
# 4b1. Select return to form (go to 5)
# 5. Returns to docket question
# 6. Select 'No' as the answer
# 7. See first docket sheets informational page
# 8. Select to see more
# 9. Finish - see second docket sheets informational page
# 10? Alterntively, click to keep using form and see 'open cases' question

# Same for user selecting 'I don't know'

Scenario: Go to only first page of docket sheets information through the popover, and then use form to see docket sheets information by clicking "No"
    I start the interview at "entrypoint-petitioner"
    When I tap the button "Next "
    When I tap the button "Yes"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then I should see the phrase "WHY GET DOCKET SHEETS"
    When I tap the button "No, take me back to the form"
    Then I should see the phrase "Do you already have certified copies"
    When I tap the button "No"
    Then I should see the phrase "WHY GET DOCKET SHEETS"
    When I tap the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    When I tap the button "I want to keep going with the form "
    Then I should see the phrase "Do you have any open criminal or juvenile cases"

Scenario: Go to both pages of docket sheets information through the popover, and then use form to see docket sheets information by taping "No"
    I start the interview at "entrypoint-petitioner"
    When I tap the button "Next "
    When I tap the button "Yes"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then I should see the phrase "WHY GET DOCKET SHEETS"
    When I tap the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    When I tap the button "I want to keep going with the form "
    Then I should see the phrase "Do you already have certified copies"
    When I tap the button "No"
    Then I should see the phrase "WHY GET DOCKET SHEETS"
    When I tap the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    When I tap the button "I want to keep going with the form "
    Then I should see the phrase "Do you have any open criminal or juvenile cases"

Scenario: Go to only first page of docket sheets information through the popover, and then use form to see docket sheets information by taping "I don't know"
    I start the interview at "entrypoint-petitioner"
    When I tap the button "Next "
    When I tap the button "Yes"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then I should see the phrase "WHY GET DOCKET SHEETS"
    When I tap the button "No, take me back to the form"
    Then I should see the phrase "Do you already have certified copies"
    When I tap the button "I don’t know"
    Then I should see the phrase "WHY GET DOCKET SHEETS"
    When I tap the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    When I tap the button "I want to keep going with the form "
    Then I should see the phrase "Do you have any open criminal or juvenile cases"

Scenario: Go to both pages of docket sheets information through the popover, and then use form to see docket sheets information by taping "I don't know"
    I start the interview at "entrypoint-petitioner"
    When I tap the button "Next "
    When I tap the button "Yes"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then I should see the phrase "WHY GET DOCKET SHEETS"
    When I tap the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    When I tap the button "I want to keep going with the form "
    Then I should see the phrase "Do you already have certified copies"
    When I tap the button "I don’t know"
    Then I should see the phrase "WHY GET DOCKET SHEETS"
    When I tap the button "Yes, tell me more"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    When I tap the button "I want to keep going with the form "
    Then I should see the phrase "Do you have any open criminal or juvenile cases"
