# Sahil Testing

The test cases in this repository were written using the Gemini CLI to assist with the generation process. And Hadnt used the Claude as I dont have the Claude Subscrption.

# Assessment Approach

Because I did not have the live application to test against for this take-home assessment, I utilized a skeleton codebase from online to serve as the structural framework. I then built and performed the test cases according to the specific assessment requirements provided below.

## Project Architecture & Testing Strategy

```mermaid
graph TD
    User([User/QA]) -->|Runs| PW[Playwright E2E Suite]
    PW -->|Uses| POM[Page Object Model]
    POM -->|Interacts with| UI[Functional UI Fallback]
    UI -->|Calls| API[Spring Boot REST API]
    API -->|Validates| Model[Claim Model]
    
    subgraph "Infrastructure"
    Docker[Docker Compose] --> Backend[Spring Boot]
    Docker --> Frontend[Nginx/UI]
    Backend -.->|Kafka Messaging| Infrastructure[Kafka/Zookeeper]
    end
```

For more detailed information, please refer to:
- [ASSESSMENT.md](./ASSESSMENT.md): Detailed project audit and technical gaps.
- [README_STRATEGY.md](./README_STRATEGY.md): Comprehensive test strategy and risk analysis.
- [WALKTHROUGH_GUIDE.md](./WALKTHROUGH_GUIDE.md): Step-by-step guide of the restoration process.
- [PRESENTATION.md](./PRESENTATION.md): Presentation slides for the hiring panel.
- [AI_JOURNAL.md](./AI_JOURNAL.md): Log of the AI collaboration process.

---

**Role:** QA Engineer  
**Project:** Claims Management Application  

**Time Guidance:** 2-3 hours target | Hard cap: 5 hours  
**Submission:** TBD – supervised session or self-timed (details to follow)

### Background 
Chubb’s current application stack includes Angular frontends, backend services with Java, Spring Boot or .NET, and messaging using Kafka. As a QA engineer we need to ensure that the quality of our applications is high — especially in the age of AI where code can be built much faster, and test coverage can fall behind even faster. 
You will be provided with a working claims application built with Angular (frontend), Spring Boot (backend services), and Kafka (messaging) — with WebSocket integration for real-time updates. A Docker Compose file is included so you can spin the full stack up locally. You will need Docker or Podman installed. Source code is provided for all layers, but the application has no tests whatsoever. 

### Your Task 
Your goal is twofold: 
1.	Assess the application. Before writing a single test, read the source code and understand how the application works. Form a view on where the highest-risk areas are — where a defect would cause the most damage, where the logic is most complex, and where the integration points between layers are most brittle. Document your assessment, however briefly. 
2.	Add tests where they matter most. Based on your assessment, implement a variety of tests that give meaningful confidence in the application. You will not have time to test everything — that is by design. Decide what to test and what to leave out, and be prepared to explain that prioritisation. 
A key part of this assessment is whether you find real issues in the application. Document any bugs, unexpected behaviours, or quality concerns you discover — whether through testing or code review. If you find nothing, say so and explain why you believe the application is sound. 

### Technology Choice 
You can use whatever appropriate frameworks you want. Typical choices by layer: 
•	Angular components: @testing-library/angular with Jest or Vitest 
•	Spring Boot services: JUnit 5, Mockito, Spring Boot Test, Testcontainers 
•	End-to-end / integration: Playwright or Cypress 
•	Kafka: Embedded Kafka or Testcontainers with the Kafka module 
•	Load testing (bonus): K6, Gatling, or similar 

### Engineering Principles We Value 
We expect the test code to reflect these principles — not as a checklist to follow, but as practices a senior engineer would naturally apply: 
•	DRY — shared fixtures, helpers, and page objects rather than copy-pasting setup code 
•	SOLID — each test has a single clear responsibility; test helpers have well-defined interfaces 
•	Clean Code — meaningful test names that read as specifications, no magic strings or numbers, self-documenting structure 

### Deliverables 
1.	Git repository with meaningful commit history showing your development process 
2.	Working test suite that can be run locally against the provided Docker Compose stack 
3.	Test strategy notes — your assessment of the application, what you chose to test and why, and any issues discovered. 
4.	AI working journal — a prompt log or equivalent showing what you accepted, what you challenged, and what you overrode. 
5.	Supporting documentation (Presentation, Walkthrough Guide). 
6.	30–60 minute walkthrough with the hiring panel 
