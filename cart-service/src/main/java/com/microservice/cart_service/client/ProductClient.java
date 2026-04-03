package com.microservice.cart_service.client;

import com.microservice.cart_service.dto.ProductDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "productservice")
public interface ProductClient {

    @GetMapping("/api/products/{id}")
    ProductDto getProduct(@PathVariable String id);
}