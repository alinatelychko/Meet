Feature: Show/Hide Event Details

  Scenario: User can show details of an event
    Given the main page is open
    When the user clicks on an event
    Then the user should see the details of that event

  Scenario: User can hide details of an event
    Given the user has opened the details of an event
    When the user clicks on hide details
    Then the details of the event should be hidden