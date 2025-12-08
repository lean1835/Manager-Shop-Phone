package com.vti.shop.controller;

import com.vti.shop.dto.SupplierDto;
import com.vti.shop.entity.Supplier;
import com.vti.shop.service.SupplierService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService service;
    @Autowired
    private ModelMapper mapper;

    private SupplierDto toDto(Supplier s) { return mapper.map(s, SupplierDto.class); }

    @GetMapping
    public List<SupplierDto> list(@RequestParam(value = "name_like", required = false) String nameLike) {
        Page<Supplier> pg = service.list(nameLike, Pageable.unpaged());
        return pg.map(this::toDto).getContent();
    }
}
