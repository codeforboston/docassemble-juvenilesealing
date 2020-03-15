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
    Given I start the interview "docassemble.playground42:juvenile-sealing-intro-9.yml"
    Then I click the button "Next "
    Then I click the button "Yes"
