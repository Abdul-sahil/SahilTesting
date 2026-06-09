import { render, screen, fireEvent } from '@testing-library/angular';
import { ClaimFormComponent } from './claim-form.component';
import { ClaimService } from '../../services/claim.service';
import { of, throwError } from 'rxjs';

/**
 * Senior-level Component Test using Angular Testing Library.
 * Tests behavior from the user's perspective, not implementation details.
 */
describe('ClaimFormComponent', () => {
  const mockClaimService = {
    submitClaim: jest.fn()
  };

  it('should show success message when submission is successful', async () => {
    mockClaimService.submitClaim.mockReturnValue(of({}));
    await render(ClaimFormComponent, {
      providers: [{ provide: ClaimService, useValue: mockClaimService }]
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/claim submitted successfully/i)).toBeInTheDocument();
  });

  it('should show error message when submission fails', async () => {
    mockClaimService.submitClaim.mockReturnValue(throwError(() => ({ error: 'Invalid amount' })));
    await render(ClaimFormComponent, {
      providers: [{ provide: ClaimService, useValue: mockClaimService }]
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid amount');
  });
});
