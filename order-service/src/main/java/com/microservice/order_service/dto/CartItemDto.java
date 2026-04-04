package com.microservice.order_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {

    private String productId;
    private String productName;
    private int quantity;
    private double price;      // price per unit
    private double totalPrice; // quantity * price
}