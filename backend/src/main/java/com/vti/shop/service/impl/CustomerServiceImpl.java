package com.vti.shop.service.impl;

import com.vti.shop.entity.Customer;
import com.vti.shop.repository.CustomerRepository;
import com.vti.shop.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository repo;

    @Override
    public Page<Customer> list(String nameLike, String addressLike, Pageable pageable) {
        if (nameLike != null && !nameLike.isEmpty()) {
            return repo.findByNameContainingIgnoreCase(nameLike, pageable);
        }
        if (addressLike != null && !addressLike.isEmpty()) {
            return repo.findByAddressContainingIgnoreCase(addressLike, pageable);
        }
        return repo.findAll(pageable);
    }

    @Override
    public Optional<Customer> get(Long id) { return repo.findById(id); }

    @Override
    public Customer create(Customer c) { c.setId(null); return repo.save(c); }

    @Override
    public Optional<Customer> update(Long id, Customer incoming) {
        return repo.findById(id).map(c -> {
            c.setName(incoming.getName());
            c.setPhone(incoming.getPhone());
            c.setAddress(incoming.getAddress());
            c.setAge(incoming.getAge());
            c.setEmail(incoming.getEmail());
            return repo.save(c);
        });
    }

    @Override
    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
