package com.vti.shop.service.impl;

import com.vti.shop.entity.Product;
import com.vti.shop.repository.ProductRepository;
import com.vti.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repo;

    @Override
    public Page<Product> list(String nameLike, BigDecimal price,  Pageable pageable) {
        if (nameLike != null && !nameLike.isEmpty()) {
            return repo.findByNameContainingIgnoreCase(nameLike, pageable);
        }
        if (price != null) {
            return repo.findByPrice(price, pageable);
        }
        return repo.findAll(pageable);
    }

    @Override
    public Optional<Product> get(Long id) { return repo.findById(id); }

    @Override
    public Product create(Product p) {
        p.setId(null);
        return repo.save(p);
    }

    @Override
    public Optional<Product> update(Long id, Product incoming) {
        return repo.findById(id).map(p -> {
            p.setName(incoming.getName());
            p.setPrice(incoming.getPrice());
            p.setImage(incoming.getImage());
            p.setScreenSize(incoming.getScreenSize());
            p.setCamera(incoming.getCamera());
            p.setSelfie(incoming.getSelfie());
            p.setCpu(incoming.getCpu());
            p.setStorage(incoming.getStorage());
            p.setDescription(incoming.getDescription());
            return repo.save(p);
        });
    }

    @Override
    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
