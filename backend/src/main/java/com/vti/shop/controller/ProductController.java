package com.vti.shop.controller;

import com.vti.shop.dto.ProductDto;
import com.vti.shop.entity.Product;
import com.vti.shop.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService service;
    @Autowired
    private ModelMapper mapper;

    private ProductDto toDto(Product p) {
        ProductDto dto = mapper.map(p, ProductDto.class);
        dto.setScreen_size(p.getScreenSize());
        return dto;
    }

    private void merge(Product src, Product dst) {
        if (src.getName() != null) dst.setName(src.getName());
        if (src.getPrice() != null) dst.setPrice(src.getPrice());
        if (src.getImage() != null) dst.setImage(src.getImage());
        if (src.getScreenSize() != null) dst.setScreenSize(src.getScreenSize());
        if (src.getCamera() != null) dst.setCamera(src.getCamera());
        if (src.getSelfie() != null) dst.setSelfie(src.getSelfie());
        if (src.getCpu() != null) dst.setCpu(src.getCpu());
        if (src.getStorage() != null) dst.setStorage(src.getStorage());
        if (src.getDescription() != null) dst.setDescription(src.getDescription());
    }

    @GetMapping
    public List<ProductDto> list(@RequestParam(value = "name_like", required = false) String nameLike,
                                 @RequestParam(value = "price", required = false) String priceParam,
                                 @RequestParam(value = "_page", required = false) Integer page,
                                 @RequestParam(value = "_limit", required = false) Integer limit) {
        Pageable pageable = Pageable.unpaged();
        if (page != null && limit != null) {
            pageable = PageRequest.of(Math.max(page-1,0), limit);
        }
        BigDecimal price = null;
        try { if (priceParam != null) price = new BigDecimal(priceParam); } catch (Exception ignored) {}
        Page<Product> pg = service.list(nameLike, price, pageable);
        return pg.map(this::toDto).getContent();
    }

    @GetMapping("/{id}")
    public ProductDto get(@PathVariable Long id) {
        Product p = service.get(id).orElseThrow();
        return toDto(p);
    }

    @PostMapping
    public ProductDto create(@RequestBody Product incoming) {
        Product saved = service.create(incoming);
        return toDto(saved);
    }

    @PutMapping("/{id}")
    public ProductDto put(@PathVariable Long id, @RequestBody Product incoming) {
        Product saved = service.update(id, incoming).orElseThrow();
        return toDto(saved);
    }

    @PatchMapping("/{id}")
    public ProductDto patch(@PathVariable Long id, @RequestBody Product incoming) {
        Product current = service.get(id).orElseThrow();
        merge(incoming, current);
        Product saved = service.update(id, current).orElseThrow();
        return toDto(saved);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        boolean ok = service.delete(id);
        if (!ok) throw new RuntimeException("Not found");
    }
}
