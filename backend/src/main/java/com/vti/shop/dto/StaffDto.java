package com.vti.shop.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class StaffDto {
    private Long id;
    private String name;
    private String gender;
    private LocalDate dob;
    private String email;
    private String address;
    private String phone;
    private Long accountID; // map from entity.account.id
}
