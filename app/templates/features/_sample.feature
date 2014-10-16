Feature: sample

  Scenario: Perform a valid HTTP request
    Given a new awesome test scenario
    When a client send a POST request to "http://localhost:8080/test"
    And request query params are "sample=hello"
    And request content type is "text/plain"
    And request accept type is "application/json"
    And request payload is:
      """
      Hi! I'm Chuck Norris
      """
    And the request is performed
    Then response status code should be 200
    And response content type should be "application/json"
    And response body description should match "success"
    And response body tags should have items "status"

  Scenario: Perform a valid HTTP request
    Given a new awesome test scenario
    When a client send a POST request to "http://localhost:8080/test"
    And request query params are "sample=hello"
    And request content type is "text/plain"
    And request accept type is "application/json"
    And request payload is:
      """
      Hi! I'm Chuck Norris
      """
    And the request is performed
    Then response status code should be 200
    And response content type should be "application/json"
    And response body description should match "success"
    And response body tags should have items "status"
