package com.projeto_oficina2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto_oficina2.backend.model.Classes;

@Repository
public interface ClassesRepository extends JpaRepository<Classes, Long> {
    Classes findById(Long id);
}