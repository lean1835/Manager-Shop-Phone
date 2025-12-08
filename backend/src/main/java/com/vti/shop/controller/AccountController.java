package com.vti.shop.controller;

import com.vti.shop.entity.Account;
import com.vti.shop.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository repo;

    @GetMapping
    public List<Account> all() {
        return repo.findAll();
    }
}
