package com.vti.shop.security.userdetails;

import com.vti.shop.entity.Account;
import com.vti.shop.repository.AccountRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class AccountUserDetailsService implements UserDetailsService {
    private final AccountRepository repo;
    public AccountUserDetailsService(AccountRepository repo) { this.repo = repo; }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account acc = repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User.withUsername(acc.getUsername())
                .password(acc.getPassword())
                .authorities(mapRole(acc.getRole()))
                .build();
    }

    private List<SimpleGrantedAuthority> mapRole(String role) {
        String r = (role == null ? "USER" : role).toUpperCase(Locale.ROOT);
        if (r.contains("ADMIN")) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if (r.contains("SALES")) return List.of(new SimpleGrantedAuthority("ROLE_SALES"));
        if (r.contains("WAREHOUSE")) return List.of(new SimpleGrantedAuthority("ROLE_WAREHOUSE"));
        if (r.contains("BUSINESS")) return List.of(new SimpleGrantedAuthority("ROLE_BUSINESS"));
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }
}
