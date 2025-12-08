package com.vti.shop.service.impl;

import com.vti.shop.entity.Account;
import com.vti.shop.entity.Staff;
import com.vti.shop.repository.AccountRepository;
import com.vti.shop.repository.StaffRepository;
import com.vti.shop.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepo;
    @Autowired
    private AccountRepository accountRepo;

    @Override
    public List<Staff> list() { return staffRepo.findAll(); }

    @Override
    public Staff create(Staff s) {
        if (s.getAccount() != null && s.getAccount().getId() != null) {
            Account acc = accountRepo.findById(s.getAccount().getId()).orElse(null);
            s.setAccount(acc);
        }
        return staffRepo.save(s);
    }

    @Override
    public Optional<Staff> update(Long id, Staff incoming) {
        return staffRepo.findById(id).map(s -> {
            s.setName(incoming.getName());
            s.setGender(incoming.getGender());
            s.setDob(incoming.getDob());
            s.setEmail(incoming.getEmail());
            s.setAddress(incoming.getAddress());
            s.setPhone(incoming.getPhone());
            if (incoming.getAccount() != null && incoming.getAccount().getId() != null) {
                accountRepo.findById(incoming.getAccount().getId()).ifPresent(s::setAccount);
            } else {
                s.setAccount(null);
            }
            return staffRepo.save(s);
        });
    }

    @Override
    public boolean delete(Long id) {
        if (!staffRepo.existsById(id)) return false;
        staffRepo.deleteById(id);
        return true;
    }
}
