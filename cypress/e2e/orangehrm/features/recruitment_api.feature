@recruitment_api
Feature: Recruitment API (add & delete candidate)
  Scenario: Add a candidate via API and then delete it via API
    Given I am logged in and I captured API auth
    When I add a candidate via the API
    Then the candidate is created
    When I delete the candidate via the API
    Then the candidate is deleted
