package com.vti.shop.controller;

import com.vti.shop.dto.StaffDto;
import com.vti.shop.entity.Account;
import com.vti.shop.entity.Staff;
import com.vti.shop.repository.AccountRepository;
import com.vti.shop.service.StaffService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffService service;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private ModelMapper mapper;

    private StaffDto toDto(Staff s) {
        StaffDto dto = mapper.map(s, StaffDto.class);
        dto.setAccountID(s.getAccount() != null ? s.getAccount().getId() : null);
        return dto;
    }

    private Staff fromDto(StaffDto dto) {
        Staff s = mapper.map(dto, Staff.class);
        if (dto.getAccountID() != null) {
            Account acc = accountRepo.findById(dto.getAccountID()).orElse(null);
            s.setAccount(acc);
        } else {
            s.setAccount(null);
        }
        return s;
    }

    @GetMapping
    public List<StaffDto> list() {
        return service.list().stream().map(this::toDto).collect(Collectors.toList());
    }

    @PostMapping
    public StaffDto create(@RequestBody StaffDto dto) {
        Staff s = fromDto(dto);
        return toDto(service.create(s));
    }

    @PutMapping("/{id}")
    public StaffDto put(@PathVariable Long id, @RequestBody StaffDto dto) {
        Staff s = fromDto(dto);
        return service.update(id, s).map(this::toDto).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        boolean ok = service.delete(id);
        if (!ok) throw new RuntimeException("Not found");
    }
}
