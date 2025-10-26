package com.projeto_oficina2.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto_oficina2.backend.model.UserType;

public interface UserTypeRepository extends JpaRepository<UserType, Long> {
    Optional<UserType> findByName(String name);
}
