package com.projeto_oficina2.backend.repository;

import com.projeto_oficina2.backend.model.Classes;
import com.projeto_oficina2.backend.model.Workshops;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClassesRepository extends JpaRepository<Classes, Long> {
    Page<Classes> findByWorkshop(Workshops workshop, Pageable pageable);
    
    @Query("SELECT COUNT(c) FROM Classes c WHERE c.workshop.id = :workshopId")
    Long countByWorkshop(@Param("workshopId") Long workshopId);
}
