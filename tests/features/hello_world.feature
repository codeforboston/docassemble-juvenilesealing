Feature: Hello world test

I just want to make sure testing is working
in this docassemble package, before I move on
to writing more complicated tests.

Scenario: Just open the first page
    Given I start the interview "docassemble.playground42:juvenile-sealing-intro-9.yml"
    When I wait 1 second
    Then I should see the phrase "Sealing your juvenile record means that"