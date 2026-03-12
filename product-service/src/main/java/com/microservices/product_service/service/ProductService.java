package com.microservices.product_service.service;

import com.microservices.product_service.model.Product;
import com.microservices.product_service.service.impl.ProductServiceImpl;

import java.util.List;

public interface ProductService {

    Product createProduct(Product product);

    List<Product> getAllProducts();

    Product getProductById(String id);
}
