@ineligibility
Feature: Test the ineligibility screens

Try to get to the screens that show ineligibility.

Scenario: User is ineligible because they don't have a MA juvenile record
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "False"
    Then the question id should be "no_ma_records_end"

Scenario: User is ineligible because they don't have docket sheets and said they will come back later
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

Scenario: User is ineligible because they have open cases
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then the question id should be "open_cases"
    When I set the var "has_NON_probation_open_cases" to "True"
    Then the question id should be "not_helped"

Scenario: User is ineligible because they are on probation
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then the question id should be "open_cases"
    When I set the var "has_NON_probation_open_cases" to "False"
    Then the question id should be "probation"
    When I set the var "is_on_probation" to "True"
    Then the question id should be "not_helped"

Scenario: User is ineligible because they have had juvenile cases in the past three years
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then the question id should be "open_cases"
    When I set the var "has_NON_probation_open_cases" to "False"
    Then the question id should be "probation"
    When I set the var "is_on_probation" to "False"
    Then the question id should be "juvenile_cases"
    When I set the var "juvenile_cases_in_past_3_years" to "True"
    Then the question id should be "not_helped"

Scenario: User is ineligible because they have been in juvenile custody
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then the question id should be "open_cases"
    When I set the var "has_NON_probation_open_cases" to "False"
    Then the question id should be "probation"
    When I set the var "is_on_probation" to "False"
    Then the question id should be "juvenile_cases"
    When I set the var "juvenile_cases_in_past_3_years" to "False"
    Then the question id should be "juvenile_custody"
    When I set the var "juvenile_custody_in_past_3_years" to "True"
    Then the question id should be "not_helped"

Scenario: User is ineligible because they have convictions in adult court
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then the question id should be "open_cases"
    When I set the var "has_NON_probation_open_cases" to "False"
    Then the question id should be "probation"
    When I set the var "is_on_probation" to "False"
    Then the question id should be "juvenile_cases"
    When I set the var "juvenile_cases_in_past_3_years" to "False"
    Then the question id should be "juvenile_custody"
    When I set the var "juvenile_custody_in_past_3_years" to "False"
    Then the question id should be "adult_cases_states"
    When I set the var "convicted_in_past_3_years_states" to "True"
    Then the question id should be "not_helped"
    
Scenario: User is ineligible because they have convictions in federal court
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then the question id should be "open_cases"
    When I set the var "has_NON_probation_open_cases" to "False"
    Then the question id should be "probation"
    When I set the var "is_on_probation" to "False"
    Then the question id should be "juvenile_cases"
    When I set the var "juvenile_cases_in_past_3_years" to "False"
    Then the question id should be "juvenile_custody"
    When I set the var "juvenile_custody_in_past_3_years" to "False"
    Then the question id should be "adult_cases_states"
    When I set the var "convicted_in_past_3_years_states" to "False"
    Then the question id should be "adult_cases_federal"
    When I set the var "convicted_in_past_3_years_federal" to "True"
    Then the question id should be "not_helped"

Scenario: User is ineligible because they were in incarceration
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then the question id should be "open_cases"
    When I set the var "has_NON_probation_open_cases" to "False"
    Then the question id should be "probation"
    When I set the var "is_on_probation" to "False"
    Then the question id should be "juvenile_cases"
    When I set the var "juvenile_cases_in_past_3_years" to "False"
    Then the question id should be "juvenile_custody"
    When I set the var "juvenile_custody_in_past_3_years" to "False"
    Then the question id should be "adult_cases_states"
    When I set the var "convicted_in_past_3_years_states" to "False"
    Then the question id should be "adult_cases_federal"
    When I set the var "convicted_in_past_3_years_federal" to "False"
    Then the question id should be "adult_incarceration"
    When I set the var "incarcerated_in_past_3_years" to "True"
    Then the question id should be "not_helped"

Scenario: User is eligible
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
    When I tap to continue
    Then the question id should be "in_ma"
    When I set the var "has_ma_juv_record" to "True"
    Then the question id should be "do_you_have_sheets"
    When I set the var "have_docket_copies_already" to "True"
    Then the question id should be "open_cases"
    When I set the var "has_NON_probation_open_cases" to "False"
    Then the question id should be "probation"
    When I set the var "is_on_probation" to "False"
    Then the question id should be "juvenile_cases"
    When I set the var "juvenile_cases_in_past_3_years" to "False"
    Then the question id should be "juvenile_custody"
    When I set the var "juvenile_custody_in_past_3_years" to "False"
    Then the question id should be "adult_cases_states"
    When I set the var "convicted_in_past_3_years_states" to "False"
    Then the question id should be "adult_cases_federal"
    When I set the var "convicted_in_past_3_years_federal" to "False"
    Then the question id should be "adult_incarceration"
    When I set the var "incarcerated_in_past_3_years" to "False"
    Then the question id should be "eligible"

