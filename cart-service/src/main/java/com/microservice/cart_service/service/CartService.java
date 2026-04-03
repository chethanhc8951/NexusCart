package com.microservice.cart_service.service;

import com.microservice.cart_service.client.ProductClient;
import com.microservice.cart_service.dto.ProductDto;
import com.microservice.cart_service.entity.Cart;
import com.microservice.cart_service.entity.CartItem;
import com.microservice.cart_service.repository.CartItemRepository;
import com.microservice.cart_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductClient productClient;

    public void addToCart(String username, String productId, int quantity) {

        Cart cart = cartRepository.findByUserName(username)
                .orElseGet(() -> cartRepository.save(new Cart(null, username)));

        Optional<CartItem> existingItem =
                cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            ProductDto product = productClient.getProduct(productId);

            CartItem item = new CartItem();
            item.setCartId(cart.getId());
            item.setProductId(productId);
            item.setQuantity(quantity);
            item.setPrice(product.getPrice());

            cartItemRepository.save(item);
        }
    }

    public List<CartItem> getCart(String username) {
        System.out.println(username+" dddddddddddddddddddddd");

        Cart cart = cartRepository.findByUserName(username).orElseThrow();
        System.out.println("ssssssssssssssss");
        return cartItemRepository.findByCartId(cart.getId());
    }

    public void removeItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public void clearCart(String username) {
        Cart cart = cartRepository.findByUserName(username).orElseThrow();
        cartItemRepository.deleteAll(cartItemRepository.findByCartId(cart.getId()));
    }
}