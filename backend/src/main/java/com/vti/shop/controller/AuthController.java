package com.vti.shop.controller;

import com.vti.shop.entity.Account;
import com.vti.shop.repository.AccountRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AccountRepository repo;
    public AuthController(AccountRepository repo) { this.repo = repo; }

    @GetMapping("/me")
    public Account me(Authentication authentication) {
        return repo.findByUsername(authentication.getName()).orElseThrow();
    }
}
