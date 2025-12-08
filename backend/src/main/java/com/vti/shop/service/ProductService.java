package com.vti.shop.service;

import com.vti.shop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.Optional;

public interface ProductService {
    Page<Product> list(String nameLike, BigDecimal price, Pageable pageable);
    Optional<Product> get(Long id);
    Product create(Product p);
    Optional<Product> update(Long id, Product p);
    boolean delete(Long id);
}
