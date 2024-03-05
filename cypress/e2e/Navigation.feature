Feature: Navigation Check

  @RunThis
  Scenario: Test_01: Navigate to home loan and then to contact us
    Given User opens the website
    When User navigates to home loan
    And User navigates to contact us from header menu

