package com.vti.shop.service;

import com.vti.shop.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CustomerService {
    Page<Customer> list(String nameLike, String addressLike, Pageable pageable);
    Optional<Customer> get(Long id);
    Customer create(Customer c);
    Optional<Customer> update(Long id, Customer c);
    boolean delete(Long id);
}
