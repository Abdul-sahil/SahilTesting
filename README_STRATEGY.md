# Claims Management App - Test Strategy (Revised)

## 1. Risk Assessment & Gap Analysis
Upon initial assessment, the application was found to be in an incomplete "skeleton" state. Critical gaps were identified:
*   **Missing Infrastructure:** Lack of build configurations (pom.xml, package.json).
*   **Missing Logic:** Kafka and WebSocket implementations are absent in the source code.
*   **Fake Tests:** The initial E2E suite was mocking the HTML itself, providing false confidence.

### High-Risk Areas Prioritised:
*   **API Validation Boundaries:** Ensuring the backend correctly rejects invalid data (negative amounts, missing fields).
*   **Component Reliability:** Verifying the Angular UI correctly handles success/error states from the service layer.
*   **Refactored E2E Flows:** Rebuilding the E2E suite to target real UI elements (using Playwright POM) while mocking the backend API for environmental stability.

## 2. Testing Layers implemented
*   **Unit Tests (JUnit 5 + MockMvc):** Validating the REST API layer for field constraints and business rules.
*   **Component Tests (Angular Testing Library):** Verifying UI behavior, specifically form submission and feedback loops.
*   **E2E Tests (Playwright):** Using Page Object Model (POM) to simulate user behavior. Removed HTML mocking to ensure tests are "real" and would fail if the UI changed.

## 3. Discovered Bugs & Observations
1.  **[CRITICAL] Missing Model Definitions:** `Claim.java` was missing, causing compilation failures. Fixed for testing purposes.
2.  **[CRITICAL] Missing Frontend Service:** `ClaimService` (Angular) was referenced but not implemented. Fixed for testing purposes.
3.  **[HIGH] Anti-Pattern in E2E:** Previous tests mocked the DOM. This was identified and refactored to use real semantic queries.
4.  **[MEDIUM] Lack of Client-Side Validation:** The Angular form relies purely on backend validation, leading to poor UX (round-trip required for basic errors).

## 4. Future Roadmap (with more time)
*   **Real Kafka Integration Tests:** Using Testcontainers to verify the message broker pipeline.
*   **WebSocket State Verification:** Implementing real WebSocket listeners in the E2E suite.
*   **Visual Regression:** Adding Playwright screenshots to detect UI shifts.
