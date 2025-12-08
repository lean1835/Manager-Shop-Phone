package com.vti.shop.dto;

import lombok.Data;

@Data
public class CustomerDto {
    private Long id;
    private String name;
    private String phone;
    private String address;
    private Integer age;
    private String email;
}
