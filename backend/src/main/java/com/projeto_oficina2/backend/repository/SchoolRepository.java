package com.projeto_oficina2.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto_oficina2.backend.model.School;

public interface SchoolRepository extends JpaRepository<School, Long> {
    Optional<School> findByName(String name);
}
