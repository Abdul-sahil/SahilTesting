package com.chubb.claims.controller;

import com.chubb.claims.model.Claim;
import com.chubb.claims.service.ClaimService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Senior-level Unit Test for ClaimController.
 * Validates business logic boundaries at the API layer.
 */
@WebMvcTest(ClaimController.class)
public class ClaimControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClaimService claimService;

    @Test
    public void shouldReturnBadRequestWhenFieldsAreMissing() throws Exception {
        String invalidClaimJson = "{\"id\":\"\", \"policyNumber\":\"\", \"amount\":100, \"description\":\"test\"}";

        mockMvc.perform(post("/api/claims")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidClaimJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void shouldReturnBadRequestWhenAmountIsNegative() throws Exception {
        String invalidClaimJson = "{\"id\":\"C1\", \"policyNumber\":\"P1\", \"amount\":-100, \"description\":\"test\"}";

        mockMvc.perform(post("/api/claims")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidClaimJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Claim amount cannot be negative"));
    }

    @Test
    public void shouldReturnOkWhenClaimIsValid() throws Exception {
        String validClaimJson = "{\"id\":\"C1\", \"policyNumber\":\"P1\", \"amount\":100, \"description\":\"test\"}";

        mockMvc.perform(post("/api/claims")
                .contentType(MediaType.APPLICATION_JSON)
                .content(validClaimJson))
                .andExpect(status().isOk())
                .andExpect(content().string("Claim submitted successfully"));
    }
}
