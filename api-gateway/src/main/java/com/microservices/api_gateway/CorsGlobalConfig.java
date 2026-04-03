package com.microservices.api_gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CorsGlobalConfig {

    @Bean
    public org.springframework.web.cors.reactive.CorsWebFilter corsWebFilter() {

        org.springframework.web.cors.CorsConfiguration config =
                new org.springframework.web.cors.CorsConfiguration();

        config.addAllowedOrigin("http://localhost:5173"); // frontend
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource source =
                new org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return new org.springframework.web.cors.reactive.CorsWebFilter(source);
    }
}