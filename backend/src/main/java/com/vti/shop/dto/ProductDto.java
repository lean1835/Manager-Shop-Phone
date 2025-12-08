package com.vti.shop.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private String image;
    private String screen_size; // map from entity.screenSize
    private String camera;
    private String selfie;
    private String cpu;
    private String storage;
    private String description;
}
