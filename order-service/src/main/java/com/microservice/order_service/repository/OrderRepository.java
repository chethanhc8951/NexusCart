package com.microservice.order_service.repository;

import com.microservice.order_service.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, String> {
    List<Orders> findByUsernameOrderByCreatedAtDesc(String username);
}