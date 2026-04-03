package com.microservices.api_gateway.filter;

import com.microservices.api_gateway.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class JwtFilter implements GlobalFilter, Ordered {

    public JwtFilter() {
        System.out.println("JwtFilter Bean Created ✅");
    }



    @Autowired
    private JwtUtils jwtUtil;

    private static final List<String> PUBLIC_URLS = List.of(
            "/api/auth/public/signin",
            "/api/auth/public/signup"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();

        // 1. Allow login/signup
        if (PUBLIC_URLS.stream().anyMatch(path::contains)) {
            return chain.filter(exchange);
        }

        // 2. Get token
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange);
        }

        String token = authHeader.substring(7);

        // 3. Validate token
        if (!jwtUtil.validateJwtToken(token)) {
            return unauthorized(exchange);
        }

        // 4. Extract username
        String username = jwtUtil.getUserNameFromJwtToken(token);

        // 5. Pass to services
        ServerHttpRequest request = exchange.getRequest().mutate()
                .header("username", username)
                .build();



        String authHeaderr = request.getHeaders().getFirst("Authorization");
        System.out.println("AUTH HEADER: " + authHeaderr);




        return chain.filter(exchange.mutate().request(request).build());
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}