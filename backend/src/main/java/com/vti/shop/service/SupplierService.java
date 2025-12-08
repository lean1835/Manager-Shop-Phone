package com.vti.shop.service;

import com.vti.shop.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SupplierService {
    Page<Supplier> list(String nameLike, Pageable pageable);
}
