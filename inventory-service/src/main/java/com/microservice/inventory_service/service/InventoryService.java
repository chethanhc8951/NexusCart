package com.microservice.inventory_service.service;

public interface InventoryService {
    boolean isInStock(String skuCode);
}
