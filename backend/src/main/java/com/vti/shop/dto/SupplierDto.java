package com.vti.shop.dto;

import lombok.Data;

@Data
public class SupplierDto {
    private Long id;
    private String name;
    private String phone;
    private String address;
    private String email;
}
