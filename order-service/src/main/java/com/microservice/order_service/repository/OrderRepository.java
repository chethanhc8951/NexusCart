package com.microservice.order_service.repository;

import com.microservice.order_service.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, String> {
}