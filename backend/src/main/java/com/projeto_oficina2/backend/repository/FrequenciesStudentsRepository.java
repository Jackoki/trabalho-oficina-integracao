package com.projeto_oficina2.backend.repository;

import com.projeto_oficina2.backend.model.FrequenciesStudents;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.Workshops;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FrequenciesStudentsRepository extends JpaRepository<FrequenciesStudents, Long> {
    Optional<FrequenciesStudents> findByUserAndWorkshop(User user, Workshops workshop);
}
