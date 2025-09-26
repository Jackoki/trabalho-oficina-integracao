package com.projeto_oficina2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto_oficina2.backend.model.UserType;

@Repository
public interface UserTypeRepository extends JpaRepository<UserType, Long> {
    UserType findByName(String name);
}