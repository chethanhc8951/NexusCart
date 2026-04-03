package com.microservices.product_service.controller;

import com.microservices.product_service.model.Product;
import com.microservices.product_service.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    @Autowired
    private ProductService service;


    @PostMapping
    public Product createProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("skuCode") String skuCode,
            @RequestParam(value = "image", required = false) MultipartFile file
    ) {
        Product product = Product.builder()
                .name(name)
                .description(description)
                .price(price)
                .skuCode(skuCode)
                .build();

        return service.createProduct(product, file);
    }

    @GetMapping
    public List<Product> getProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable String id) {
        return service.getProductById(id);
    }

}