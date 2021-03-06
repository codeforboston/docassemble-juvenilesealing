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
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "False"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "False"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "False"
    Then the question id should be "open_cases"

Scenario: Go to both pages of docket sheets information through the popover, and then use form to see docket sheets information by taping "No"
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "False"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "False"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "False"
    Then the question id should be "open_cases"

Scenario: Go to only first page of docket sheets information through the popover, and then use form to see docket sheets information by taping "I don't know"
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "False"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "None"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "False"
    Then the question id should be "open_cases"

Scenario: Go to both pages of docket sheets information through the popover, and then use form to see docket sheets information by taping "I don't know"
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    And I tap the defined text link "docket sheets"
    When I tap the link "Read more about docket sheets…"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "False"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "None"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "False"
    Then the question id should be "open_cases"
