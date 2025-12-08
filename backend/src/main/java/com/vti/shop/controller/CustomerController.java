package com.vti.shop.controller;

import com.vti.shop.dto.CustomerDto;
import com.vti.shop.entity.Customer;
import com.vti.shop.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;
    @Autowired
    private ModelMapper mapper;

    private CustomerDto toDto(Customer c) { return mapper.map(c, CustomerDto.class); }

    @GetMapping
    public List<CustomerDto> list(@RequestParam(value = "name_like", required = false) String nameLike,
                                  @RequestParam(value = "address_like", required = false) String addressLike) {
        Page<Customer> pg = service.list(nameLike, addressLike, Pageable.unpaged());
        return pg.map(this::toDto).getContent();
    }

    @GetMapping("/{id}")
    public CustomerDto get(@PathVariable Long id) {
        return service.get(id).map(this::toDto).orElseThrow();
    }

    @PostMapping
    public CustomerDto create(@RequestBody Customer c) {
        return toDto(service.create(c));
    }

    @PutMapping("/{id}")
    public CustomerDto put(@PathVariable Long id, @RequestBody Customer c) {
        return service.update(id, c).map(this::toDto).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        boolean ok = service.delete(id);
        if (!ok) throw new RuntimeException("Not found");
    }
}
