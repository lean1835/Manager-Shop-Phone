package com.vti.shop.service;

import com.vti.shop.entity.Staff;
import java.util.List;
import java.util.Optional;

public interface StaffService {
    List<Staff> list();
    Staff create(Staff s);
    Optional<Staff> update(Long id, Staff s);
    boolean delete(Long id);
}
