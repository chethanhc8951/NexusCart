package com.microservices.auth_service.service;


import com.microservices.auth_service.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User registerUser(User user);

}
