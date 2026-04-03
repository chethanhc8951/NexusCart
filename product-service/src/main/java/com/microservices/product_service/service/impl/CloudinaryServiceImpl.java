package com.microservices.product_service.service.impl;

import com.cloudinary.Cloudinary;
import com.microservices.product_service.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of());
            return uploadResult.get("url").toString();
        } catch (Exception e) {
            throw new RuntimeException("Image upload failed");
        }
    }
}