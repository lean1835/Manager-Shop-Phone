package com.vti.shop.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private BigDecimal price;
    private String image;

    @Column(name = "screen_size")
    private String screenSize;

    private String camera;
    private String selfie;
    private String cpu;
    private String storage;

    @Column(columnDefinition = "TEXT")
    private String description;
}
