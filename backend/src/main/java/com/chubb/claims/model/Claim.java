package com.chubb.claims.model;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class Claim {
    @NotBlank(message = "ID is required")
    private String id;

    @NotBlank(message = "Policy number is required")
    private String policyNumber;

    @NotNull(message = "Amount is required")
    @Min(value = 0, message = "Amount cannot be negative")
    private Double amount;

    private String description;

    public Claim() {}

    public Claim(String id, String policyNumber, Double amount, String description) {
        this.id = id;
        this.policyNumber = policyNumber;
        this.amount = amount;
        this.description = description;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
