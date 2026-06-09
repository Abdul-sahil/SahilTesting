import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = '/api/claims';

  constructor(private http: HttpClient) {}

  submitClaim(claim: any): Observable<any> {
    return this.http.post(this.apiUrl, claim);
  }
}
