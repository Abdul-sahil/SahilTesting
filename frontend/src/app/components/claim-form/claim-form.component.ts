import { Component } from '@angular/core';
import { ClaimService } from '../../services/claim.service';

@Component({
  selector: 'app-claim-form',
  template: `
    <form (submit)="onSubmit()">
      <label for="claim-id">Claim ID</label>
      <input id="claim-id" [(ngModel)]="claim.id" name="id">

      <label for="policy-number">Policy Number</label>
      <input id="policy-number" [(ngModel)]="claim.policyNumber" name="policyNumber">

      <label for="amount">Claim Amount</label>
      <input id="amount" type="number" [(ngModel)]="claim.amount" name="amount">

      <label for="description">Description</label>
      <textarea id="description" [(ngModel)]="claim.description" name="description"></textarea>

      <button type="submit">Submit</button>
      
      <div *ngIf="successMessage" class="success">{{successMessage}}</div>
      <div *ngIf="errorMessage" role="alert" class="error">{{errorMessage}}</div>
    </form>
  `
})
export class ClaimFormComponent {
  claim = { id: '', policyNumber: '', amount: 0, description: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private claimService: ClaimService) {}

  onSubmit() {
    // BUG-LOGGED: Client-side validation missing for negative amount
    this.claimService.submitClaim(this.claim).subscribe({
      next: () => this.successMessage = 'Claim submitted successfully',
      error: (err) => this.errorMessage = err.error || 'Submission failed'
    });
  }
}
