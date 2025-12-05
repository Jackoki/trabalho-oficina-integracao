package com.projeto_oficina2.backend.repository;

import com.projeto_oficina2.backend.model.School;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.UserType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCode(String code);
    Optional<User> findByName(String name);
    
    @Query("SELECT u FROM User u WHERE u.userType = :userType ORDER BY u.name ASC")
    List<User> findByUserType(@Param("userType") UserType userType);

    List<User> findBySchool(School school);
    List<User> findBySchoolAndUserType(School school, UserType userType);

    @Query("SELECT u FROM User u WHERE u.code = :code AND u.id <> :id")
    Optional<User> findByCodeExcludingId(@Param("code") String code, @Param("id") Long id);
    
    Page<User> findBySchoolAndUserType(School school, UserType userType, Pageable pageable);

    
    @Query("SELECT u FROM User u WHERE u.userType = :userType ORDER BY u.name ASC")
    Page<User> findByUserType(@Param("userType") UserType userType, Pageable pageable);
}
