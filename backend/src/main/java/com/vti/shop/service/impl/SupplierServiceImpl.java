package com.vti.shop.service.impl;

import com.vti.shop.entity.Supplier;
import com.vti.shop.repository.SupplierRepository;
import com.vti.shop.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository repo;

    @Override
    public Page<Supplier> list(String nameLike, Pageable pageable) {
        if (nameLike != null && !nameLike.isEmpty()) {
            return repo.findByNameContainingIgnoreCase(nameLike, pageable);
        }
        return repo.findAll(pageable);
    }
}
