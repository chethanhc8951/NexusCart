package com.microservice.cart_service.controller;

import com.microservice.cart_service.entity.CartItem;
import com.microservice.cart_service.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public String addToCart(@RequestParam String productId,
                            @RequestParam int quantity,
                            HttpServletRequest request) {

        String username = request.getHeader("username");
        System.out.println("USERNAME: " + username);

        cartService.addToCart(username, productId, quantity);
        return "Added to cart";
    }

    @GetMapping
    public List<CartItem> getCart(@RequestParam String username) {
        System.out.println("USERNAME this is cart controller : " + username);
        return cartService.getCart(username);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public String removeItem(@PathVariable Long cartItemId) {
        cartService.removeItem(cartItemId);
        return "Item removed";
    }

    @DeleteMapping("/clear")
    public String clearCart(@RequestParam String username) {
//        String username = request.getHeader("username");

        System.out.println("this is the clear cart" + username);
        cartService.clearCart(username);
        return "Cart cleared";
    }
}