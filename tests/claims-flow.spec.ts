import { test, expect } from '@playwright/test';
import { ClaimFormPage } from './page_objects/ClaimFormPage';

/**
 * Refactored E2E Flows.
 * Note: Removed "Senior QA Strategy" of mocking HTML as it is an anti-pattern for E2E.
 * Tests now assume a running application but use API mocking for environmental isolation.
 */
test.describe('Insurance Claims Lifecycle E2E Flows', () => {
  let claimFormPage: ClaimFormPage;

  test.beforeEach(async ({ page }) => {
    claimFormPage = new ClaimFormPage(page);

    // Mock API response for success
    await page.route('**/api/claims', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        const postData = request.postDataJSON();
        if (postData.amount < 0) {
          await route.fulfill({ 
            status: 400, 
            contentType: 'application/json',
            body: JSON.stringify('Claim amount cannot be negative') 
          });
        } else if (!postData.id || !postData.policyNumber) {
          await route.fulfill({ 
            status: 400, 
            contentType: 'application/json',
            body: JSON.stringify('Required fields missing') 
          });
        } else {
          await route.fulfill({ 
            status: 200, 
            contentType: 'application/json',
            body: JSON.stringify('Claim submitted successfully') 
          });
        }
      }
    });

    // We navigate to the real application URL (configured in playwright.config.ts)
    await claimFormPage.goto();
  });

  test('Positive: Submit valid claim', async ({ page }) => {
    const claimData = {
      id: `ID-${Date.now()}`,
      policyNumber: `POL-${Date.now()}`,
      amount: '1500.00',
      description: 'Test claim'
    };

    await claimFormPage.submitFullClaim(claimData);

    // Assert success via UI elements
    await expect(page.locator('.success')).toBeVisible();
    await expect(page.locator('.success')).toContainText('successfully');
  });

  test('Negative: Submit invalid negative claim amount', async ({ page }) => {
    const claimData = {
      id: `ID-${Date.now()}`,
      policyNumber: `POL-NEG`,
      amount: '-100',
      description: 'Negative amount test'
    };

    await claimFormPage.submitFullClaim(claimData);

    // Assert that the application handles the validation error
    await expect(page.locator('.error')).toBeVisible();
    await expect(page.locator('.error')).toContainText(/negative|invalid/i);
  });

  test('Boundary: Submit claim with zero amount', async ({ page }) => {
    const claimData = {
      id: `ID-ZERO`,
      policyNumber: `POL-ZERO`,
      amount: '0',
      description: 'Zero amount claim'
    };

    await claimFormPage.submitFullClaim(claimData);
    await expect(page.locator('.success')).toBeVisible();
  });
});
