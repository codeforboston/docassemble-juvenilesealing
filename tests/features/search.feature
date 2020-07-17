Feature: Search chercher tech in google

	# to check first cucumber works or not
	Scenario: Verify result for google search
		Given The browser is open
		When open the Google page
		And search for chercher tech
		Then Count the results