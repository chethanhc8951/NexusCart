package com.microservice.order_service.service;

import com.microservice.order_service.client.CartClient;
import com.microservice.order_service.dto.CartDto;
import com.microservice.order_service.dto.CartItem;
import com.microservice.order_service.entity.Orders;
import com.microservice.order_service.entity.OrderStatus;
import com.microservice.order_service.entity.Orders;
import com.microservice.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartClient cartClient;

    public Orders placeOrder(String username) {

        List<CartItem> items = cartClient.getCart(username);

        if (items.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double total = items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        Orders order = new Orders();
        System.out.println("the username in order service"+username);
        order.setUsername(username);
        order.setTotalAmount(total);
        order.setStatus(OrderStatus.CREATED);
        order.setCreatedAt(LocalDateTime.now());

        Orders savedOrder = orderRepository.save(order);

        // Clear cart after order placed
        cartClient.clearCart(username);

        System.out.println("Incoming userName: os" + username);

        return savedOrder;
    }
}