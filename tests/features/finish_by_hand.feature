
Feature: Finish by hand

# After I am found to be eligible, if I click the "Finish by hand" button,
# I should be taken to the correct page.
# If I click continue on that page, I should be taken to the final page.

# https://stackoverflow.com/questions/247135/using-xpath-to-search-text-containing-nbsp
@finish_by_hand
Scenario: Qualify for sealing and elect to finish by hand

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
    When I set the var "will_write_personal_info" to "True"
    Then the question id should be "get_attachment"
    When I tap to continue
    Then the question id should be "finish_with_more"

