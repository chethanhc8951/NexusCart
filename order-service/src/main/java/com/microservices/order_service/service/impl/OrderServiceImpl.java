package com.microservices.order_service.service.impl;

import com.microservices.order_service.openfign.InventoryClient;
import com.microservices.order_service.model.Order;
import com.microservices.order_service.repository.OrderRepository;
import com.microservices.order_service.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repository;
    private final InventoryClient inventoryClient;

    public String placeOrder(Order order) {

        Boolean inStock = inventoryClient.isInStock(order.getSkuCode());

        if (Boolean.TRUE.equals(inStock)) {

            order.setOrderNumber(UUID.randomUUID().toString());

            repository.save(order);

            return "Order Placed Successfully";

        } else {
            throw new RuntimeException("Product out of stock");
        }
    }
}