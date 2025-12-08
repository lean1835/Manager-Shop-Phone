package com.vti.shop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class StockDto {
    private Long id;
    private ProductSimple product;
    private SupplierSimple supplier;
    private Integer quantity;
    private BigDecimal importPrice;
    private LocalDate importDate;

    @Data
    public static class ProductSimple {
        private Long id;
        private String name;
        private String image;
    }

    @Data
    public static class SupplierSimple {
        private Long id;
        private String name;
    }
}
