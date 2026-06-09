package com.chubb.claims.service;

import com.chubb.claims.model.Claim;
import org.springframework.stereotype.Service;

@Service
public class ClaimService {
    public void processClaim(Claim claim) {
        // Simulates pushing to Kafka and broadcasting via WebSocket
        System.out.println("Processing claim: " + claim.getId());
    }
}
