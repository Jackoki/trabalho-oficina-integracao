package com.projeto_oficina2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto_oficina2.backend.model.School;

@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {
    School findByName(String name);
}