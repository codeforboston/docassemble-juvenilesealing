@docket_sheets_question
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
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "False"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "False"
    Then the question id should be "open_cases"

Scenario: Use interview "No" answer flow path to see second page of docket sheets info
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "False"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "False"
    Then the question id should be "open_cases"

Scenario: Use interview "No" answer flow path to exit from the second page of docket sheets info
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "False"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "True"
    Then the question id should be "end_without_finishing"

################

Scenario: Use interview "I don't know" answer flow path to see first page of docket sheets info
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    # The original test had a logic error. The line below should be
    # for the "None" option, not the "False" option.
    When I set the var "have_docket_copies_already" to "False"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "False"
    Then the question id should be "open_cases"

Scenario: Use interview "I don't know" answer flow path to see second page of docket sheets info
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    # The original test had a logic error. The line below should be
    # for the "None" option, not the "False" option.
    When I set the var "have_docket_copies_already" to "False"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "False"
    Then the question id should be "open_cases"

Scenario: Use interview "I don't know" answer flow path to exit from the second page of docket sheets info
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    # The original test had a logic error. The line below should be
    # for the "None" option, not the "False" option.
    When I set the var "have_docket_copies_already" to "False"
    Then the question id should be "what_are_docket_sheets"
    When I set the var "wants_docket_instructions" to "True"
    Then the question id should be "certified_copies_page_text_question"
    When I set the var "stop_for_docket_sheets" to "True"
    Then the question id should be "end_without_finishing"


