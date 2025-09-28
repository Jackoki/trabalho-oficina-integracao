package com.projeto_oficina2.backend.repository;

import com.projeto_oficina2.backend.model.School;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.UserType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCode(String code);
    List<User> findByUserType(UserType userType);
    List<User> findBySchool(School school);
    List<User> findBySchoolAndUserType(School school, UserType userType);

    
    Page<User> findBySchoolAndUserType(School school, UserType userType, Pageable pageable);
}
