package com.microservice.order_service.client;

import com.microservice.order_service.dto.CartDto;
import com.microservice.order_service.dto.CartItem;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "cart-service")
public interface CartClient {

    @GetMapping("/cart")
    List<CartItem> getCart(@RequestParam("username") String username);

    @DeleteMapping("/cart/clear")
    void clearCart(@RequestParam("username") String username);
}