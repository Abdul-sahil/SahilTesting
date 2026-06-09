# Claims Management App - Test Strategy (Revised)

## 1. Risk Assessment & Gap Analysis
Upon initial assessment, the application was found to be in an incomplete "skeleton" state. Critical gaps were identified:

### Test Architecture Diagram
```mermaid
graph TD
    User([User/QA]) -->|Runs| PW[Playwright E2E Suite]
    PW -->|Uses| POM[Page Object Model]
    POM -->|Interacts with| UI[Angular Frontend]
    UI -->|Calls| API[Spring Boot REST API]
    API -->|Validates| Model[Claim Model]
    
    subgraph "Testing Layers"
    Unit[JUnit 5 Unit Tests] -.->|Verify| API
    Comp[Angular Component Tests] -.->|Verify| UI
    end
```

*   **Missing Infrastructure:** Lack of build configurations (pom.xml, package.json).
*   **Missing Logic:** Kafka and WebSocket implementations are absent in the source code.
*   **Fake Tests:** The initial E2E suite was mocking the HTML itself, providing false confidence.

### High-Risk Areas Prioritised:
*   **API Validation Boundaries:** Ensuring the backend correctly rejects invalid data (negative amounts, missing fields).
*   **Component Reliability:** Verifying the Angular UI correctly handles success/error states from the service layer.
*   **Refactored E2E Flows:** Rebuilding the E2E suite to target real UI elements (using Playwright POM) while mocking the backend API for environmental stability.

## 2. Testing Layers & Infrastructure implemented
*   **Unit Tests (JUnit 5 + MockMvc):** Validating the REST API layer for field constraints and business rules.
*   **Component Tests (Angular Testing Library):** Verifying UI behavior, specifically form submission and feedback loops.
*   **E2E Tests (Playwright):** Using Page Object Model (POM) to simulate user behavior. Removed HTML mocking to ensure tests are "real."
*   **API Contract (OpenAPI 3.0):** Defined a formal specification in `openapi.yaml` to serve as the source of truth for all layers.
*   **Infrastructure (Docker + Maven):** Added `Dockerfile`s and `pom.xml` to ensure the platform is buildable via `docker-compose`.

## 3. Discovered Bugs & Observations
1.  **[CRITICAL] Missing Infrastructure:** Build files (pom.xml, Dockerfiles) were absent. **Action Taken:** Proactively created minimal versions to restore buildability.
2.  **[CRITICAL] Missing Model Definitions:** `Claim.java` was missing, causing compilation failures. **Action Taken:** Implemented model with JSR-303 validations.
3.  **[CRITICAL] Missing Frontend Service:** `ClaimService` (Angular) was referenced but not implemented. **Action Taken:** Implemented for testing purposes.
4.  **[HIGH] Anti-Pattern in E2E:** Previous tests mocked the DOM. **Action Taken:** Refactored to use real semantic queries.

## 4. Future Roadmap (with more time)
*   **Real Kafka Integration Tests:** Using Testcontainers to verify the message broker pipeline.
*   **WebSocket State Verification:** Implementing real WebSocket listeners in the E2E suite.
*   **Visual Regression:** Adding Playwright screenshots to detect UI shifts.
