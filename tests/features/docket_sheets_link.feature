Feature: Link to docket sheets pages flow

# Description:
# This isn't the yes/no/maybe button flow from the
# docket sheets question. This is the 'read more'
# link. It should always go through the whole certified
# docket sheets info pages flow, allowing for an exit
# and going back to the last spot in the form when
# otherwise done with the flow.

# Steps:
# 1. Get to docket question
# 2. Click on popover link
# 3. Select in popover
# 4a. Select return to form
# 4a1. Finish - Returns to form at previous location
# 4b. Select to see more
# 4b1. Select return to form
# 4b1a. Finish - Returns to form at previous location
# 4b2. Select to exit
# 4b2a. Finish - Exits

Scenario: Use link to see information about docket sheets
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "False"
    Then I should see the phrase "Do you already have certified copies"

Scenario: Use link to see information about docket sheets and click "Yes, tell me more"
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "False"
    Then I should see the phrase "Do you already have certified copies"

Scenario: Use link to see information about docket sheets and come back after ordering docket sheets
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then I should see the phrase "HOW TO GET CERTIFIED DOCKET SHEETS"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then I should see the phrase "THANK YOU FOR COMING"
