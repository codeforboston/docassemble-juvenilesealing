Feature: Docket sheet question regular flow

# Description:
# Regular interview flow for docket sheets question
# with non-yes answers.

# Steps:
# 1. Get to docket question
# 2. Select 'No' as the answer
# 3. See first docket sheets informational page
# 4a. Select to go back to form (go to 5)
# 4b. Select to see more
# 4b1. See second informational page
# 4b1. Select to go back to form (go to 5)
# 4b2. Select to exit
# 4b2a. Finish - Exit
# 5. Finish - See 'open cases' question

Scenario: Use link to see information about docket sheets
    Given I start the interview "docassemble.playground42:juvenile-sealing-intro-9.yml"
    Then I should see the phrase "Sealing your juvenile record means that"
