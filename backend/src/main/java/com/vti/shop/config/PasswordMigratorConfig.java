package com.vti.shop.config;

import com.vti.shop.entity.Account;
import com.vti.shop.repository.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordMigratorConfig {
    @Bean
    public CommandLineRunner migratePasswords(AccountRepository repo, PasswordEncoder encoder) {
        return args -> {
            for (Account a : repo.findAll()) {
                String p = a.getPassword();
                if (p != null && !(p.startsWith("$2a$") || p.startsWith("$2b$") || p.startsWith("$2y$"))) {
                    a.setPassword(encoder.encode(p));
                    repo.save(a);
                }
            }
        };
    }
}
