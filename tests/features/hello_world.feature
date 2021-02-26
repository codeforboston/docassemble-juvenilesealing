Feature: Hello world test

I just want to make sure testing is working
in this docassemble package, before I move on
to writing more complicated tests.

Scenario: Just open the first page
    Given I start the interview at "entrypoint-petitioner"
    Then the question id should be "intro"
