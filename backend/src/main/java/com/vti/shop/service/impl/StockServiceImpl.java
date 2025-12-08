package com.vti.shop.service.impl;

import com.vti.shop.entity.Product;
import com.vti.shop.entity.Stock;
import com.vti.shop.entity.Supplier;
import com.vti.shop.repository.ProductRepository;
import com.vti.shop.repository.StockRepository;
import com.vti.shop.repository.SupplierRepository;
import com.vti.shop.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository repo;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private SupplierRepository supplierRepo;

    @Override
    public Page<Stock> list(String productNameLike, Pageable pageable) {
        if (productNameLike != null && !productNameLike.isEmpty()) {
            return repo.findByProduct_NameContainingIgnoreCase(productNameLike, pageable);
        }
        return repo.findAll(pageable);
    }

    @Override
    public Stock create(Stock s) {
        return repo.save(s);
    }

    @Override
    public Optional<Stock> update(Long id, Stock s) {
        return repo.findById(id).map(existing -> {
            existing.setProduct(s.getProduct());
            existing.setSupplier(s.getSupplier());
            existing.setQuantity(s.getQuantity());
            existing.setImportPrice(s.getImportPrice());
            existing.setImportDate(s.getImportDate());
            return repo.save(existing);
        });
    }

    @Override
    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

    @Override
    public Optional<Stock> get(Long id) { return repo.findById(id); }
}
