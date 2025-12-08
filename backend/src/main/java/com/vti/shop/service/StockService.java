package com.vti.shop.service;

import com.vti.shop.entity.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface StockService {
    Page<Stock> list(String productNameLike, Pageable pageable);
    Stock create(Stock s);
    Optional<Stock> update(Long id, Stock s);
    boolean delete(Long id);
    Optional<Stock> get(Long id);
}
