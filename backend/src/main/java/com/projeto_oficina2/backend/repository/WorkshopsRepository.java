package com.projeto_oficina2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto_oficina2.backend.model.Workshops;

@Repository
public interface WorkshopsRepository extends JpaRepository<Workshops, Long> {
    Workshops findByName(String name);
}