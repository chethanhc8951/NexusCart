package com.microservices.order_service.service;

import com.microservices.order_service.model.Order;

public interface OrderService {
    String placeOrder(Order order);
}
