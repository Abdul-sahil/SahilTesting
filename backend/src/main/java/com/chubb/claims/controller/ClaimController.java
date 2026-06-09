package com.chubb.claims.controller;

import com.chubb.claims.model.Claim;
import com.chubb.claims.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public ResponseEntity<String> submitClaim(@Valid @RequestBody Claim claim) {
        // High-risk area: Validation logic
        if (claim.getAmount() < 0) {
            return ResponseEntity.badRequest().body("Claim amount cannot be negative");
        }
        claimService.processClaim(claim);
        return ResponseEntity.ok("Claim submitted successfully");
    }
}
