Feature: Admin Users - add and delete

  Background:
    Given I login as admin
    And I open the Admin Users page

  Scenario: Add, verify, search, delete, verify counts
    When I note the number of records
    And I add a new user from test data
    Then the records count increases by 1
    When I search for the created user
    Then at least one result is shown
    When I delete the first result
    Then the records count decreases by 1
