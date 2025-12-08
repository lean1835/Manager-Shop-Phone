package com.vti.shop.controller;

import com.vti.shop.dto.StockCreateRequest;
import com.vti.shop.dto.StockDto;
import com.vti.shop.entity.Product;
import com.vti.shop.entity.Stock;
import com.vti.shop.entity.Supplier;
import com.vti.shop.repository.ProductRepository;
import com.vti.shop.repository.SupplierRepository;
import com.vti.shop.service.StockService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockService service;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private SupplierRepository supplierRepo;
    @Autowired
    private ModelMapper mapper;

    private StockDto toDto(Stock st) {
        StockDto dto = mapper.map(st, StockDto.class);
        StockDto.ProductSimple ps = new StockDto.ProductSimple();
        ps.setId(st.getProduct().getId());
        ps.setName(st.getProduct().getName());
        ps.setImage(st.getProduct().getImage());
        dto.setProduct(ps);
        StockDto.SupplierSimple ss = new StockDto.SupplierSimple();
        ss.setId(st.getSupplier().getId());
        ss.setName(st.getSupplier().getName());
        dto.setSupplier(ss);
        return dto;
    }

    @GetMapping
    public ResponseEntity<List<StockDto>> list(@RequestParam(value = "_page", required = false) Integer page,
                                               @RequestParam(value = "_limit", required = false) Integer limit,
                                               @RequestParam(value = "name_like", required = false) String productNameLike,
                                               @RequestParam(value = "_expand", required = false) List<String> expand,
                                               @RequestParam(value = "_sort", required = false) String sort,
                                               @RequestParam(value = "_order", required = false) String order) {
        Pageable pageable = Pageable.unpaged();
        if (page != null && limit != null) {
            pageable = PageRequest.of(Math.max(page-1,0), limit);
        }
        Page<Stock> pg = service.list(productNameLike, pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", String.valueOf(pg.getTotalElements()));
        return ResponseEntity.ok().headers(headers).body(pg.map(this::toDto).getContent());
    }

    @GetMapping("/{id}")
    public StockDto get(@PathVariable Long id) {
        return service.get(id).map(this::toDto).orElseThrow();
    }

    @PostMapping
    public StockDto create(@RequestBody StockCreateRequest req) {
        Product p = productRepo.findById(req.getProductId()).orElseThrow();
        Supplier s = supplierRepo.findById(req.getSupplierId()).orElseThrow();
        Stock st = new Stock(null, p, s, req.getQuantity(), req.getImportPrice(), req.getImportDate());
        return toDto(service.create(st));
    }

    @PutMapping("/{id}")
    public StockDto put(@PathVariable Long id, @RequestBody StockCreateRequest req) {
        Product p = productRepo.findById(req.getProductId()).orElseThrow();
        Supplier s = supplierRepo.findById(req.getSupplierId()).orElseThrow();
        Stock st = new Stock(id, p, s, req.getQuantity(), req.getImportPrice(), req.getImportDate());
        return service.update(id, st).map(this::toDto).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        boolean ok = service.delete(id);
        if (!ok) throw new RuntimeException("Not found");
    }
}
