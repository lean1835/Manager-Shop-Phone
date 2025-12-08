package com.vti.shop.repository;

import com.vti.shop.entity.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Page<Stock> findAll(Pageable pageable);
    Page<Stock> findByProduct_NameContainingIgnoreCase(String productName, Pageable pageable);
}
