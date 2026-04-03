package com.microservice.cart_service.dto;

import lombok.Data;

@Data
public class ProductDto {
    private String id;
    private String name;
    private double price;
    private String imageUrl;
}