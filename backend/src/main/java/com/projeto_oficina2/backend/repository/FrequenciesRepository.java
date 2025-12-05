package com.projeto_oficina2.backend.repository;

import com.projeto_oficina2.backend.model.Classes;
import com.projeto_oficina2.backend.model.Frequencies;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.Workshops;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FrequenciesRepository extends JpaRepository<Frequencies, Long> {
    List<Frequencies> findByClasses(Classes classes);
    Optional<Frequencies> findByClassesAndUser(Classes classes, User user);
        
    @Query("SELECT f FROM Frequencies f WHERE f.classes.workshop = :workshop AND f.user = :user ORDER BY f.classes.classNumber")
    List<Frequencies> findByWorkshopAndUser(@Param("workshop") Workshops workshop, @Param("user") User user);
}
