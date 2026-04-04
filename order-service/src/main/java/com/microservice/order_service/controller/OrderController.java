package com.microservice.order_service.controller;

import com.microservice.order_service.entity.Orders;
import com.microservice.order_service.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<Orders> placeOrder( HttpServletRequest request) {

        String username = request.getHeader("username");
        System.out.println("USERNAME: " + username);

        System.out.println("Incoming userName: oc" + username);
        return ResponseEntity.ok(orderService.placeOrder(username));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Orders>> getMyOrders(HttpServletRequest request) {

        String username = request.getHeader("username"); // logged-in user

        List<Orders> orders = orderService.getUserOrders(username);

        return ResponseEntity.ok(orders);
    }
}