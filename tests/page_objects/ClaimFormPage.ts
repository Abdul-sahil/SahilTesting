import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Insurance Claims Submission Form.
 * Uses robust semantic locators to ensure test stability across UI iterations.
 */
export class ClaimFormPage {
  readonly page: Page;
  readonly claimIdInput: Locator;
  readonly policyNumberInput: Locator;
  readonly claimAmountInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Semantic locators - highly robust as they target accessible labels and roles
    this.claimIdInput = page.getByLabel('Claim ID');
    this.policyNumberInput = page.getByLabel('Policy Number');
    this.claimAmountInput = page.getByLabel('Claim Amount');
    this.descriptionInput = page.getByLabel('Description');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  /**
   * Navigates to the claims submission page.
   */
  async goto() {
    await this.page.goto('/claims/new'); // Adjust path as per final routing
  }

  /**
   * Fills out the standard claim form fields.
   */
  async fillClaimForm(claimDetails: { 
    id: string, 
    policyNumber: string, 
    amount: string, 
    description: string 
  }) {
    await this.claimIdInput.fill(claimDetails.id);
    await this.policyNumberInput.fill(claimDetails.policyNumber);
    await this.claimAmountInput.fill(claimDetails.amount);
    await this.descriptionInput.fill(claimDetails.description);
  }

  /**
   * Clicks the submit button.
   */
  async submit() {
    await this.submitButton.click();
  }

  /**
   * Helper method to perform the full submission flow in one call.
   */
  async submitFullClaim(claimDetails: { 
    id: string, 
    policyNumber: string, 
    amount: string, 
    description: string 
  }) {
    await this.fillClaimForm(claimDetails);
    await this.submit();
  }
}
