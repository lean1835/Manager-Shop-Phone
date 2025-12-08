package com.vti.shop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class StockCreateRequest {
    private Long productId;
    private Long supplierId;
    private Integer quantity;
    private BigDecimal importPrice;
    private LocalDate importDate;
}
