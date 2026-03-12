package com.microservices.auth_service.ropository;


import com.microservices.auth_service.model.AppRole;
import com.microservices.auth_service.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(AppRole appRole);

}