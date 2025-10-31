Feature: Recruitment API (add & delete candidate)

  Background:
    Given I am logged into OrangeHRM as admin

  Scenario: Add a candidate via API and then delete it via API
    When I create a candidate via API from fixture "recruitment"
    Then the candidate is created and has an id
    When I delete the candidate via API
    Then the candidate is deleted successfully
