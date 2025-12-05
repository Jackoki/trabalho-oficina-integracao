package com.projeto_oficina2.backend.service;

import com.projeto_oficina2.backend.model.Classes;
import com.projeto_oficina2.backend.model.Workshops;
import com.projeto_oficina2.backend.repository.ClassesRepository;
import com.projeto_oficina2.backend.repository.WorkshopsRepository;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ClassesService {

    private final ClassesRepository classesRepository;
    private final WorkshopsRepository workshopsRepository;

    public ClassesService(ClassesRepository classesRepository, WorkshopsRepository workshopsRepository) {
        this.classesRepository = classesRepository;
        this.workshopsRepository = workshopsRepository;
    }

    public Page<Classes> paginateByWorkshop(Long workshopId, int page, int size) {
        Workshops workshop = workshopsRepository.findById(workshopId)
            .orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 5));
        return classesRepository.findByWorkshop(workshop, pageable);
    }

    public Long countClassesDone(Long workshopId) {
        return classesRepository.countClassesByWorkshop(workshopId);
    }

    @Transactional
    public Classes createNextClass(Long workshopId) {
        Workshops workshop = workshopsRepository.findById(workshopId)
            .orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        Integer max = classesRepository.findMaxClassNumberByWorkshop(workshopId);
        int nextNumber = (max == null) ? 1 : max + 1;

        if (workshop.getNumberClasses() != null && nextNumber > workshop.getNumberClasses()) {
            throw new RuntimeException("Número máximo de aulas já atingido");
        }

        Classes newClass = new Classes();
        newClass.setClassNumber(nextNumber);
        newClass.setWorkshop(workshop);

        long actual = workshop.getActualNumberClasses() == null ? 0 : workshop.getActualNumberClasses();
        workshop.setActualNumberClasses(actual + 1);
        workshopsRepository.save(workshop);

        return classesRepository.save(newClass);
    }

    @Transactional
    public void deleteClass(Long workshopId, Long classId) {
        Classes c = classesRepository.findById(classId)
            .orElseThrow(() -> new RuntimeException("Aula não encontrada"));

        Integer max = classesRepository.findMaxClassNumberByWorkshop(workshopId);
        if (!c.getClassNumber().equals(max)) {
            throw new RuntimeException("Só é possível deletar a aula mais recente");
        }

        classesRepository.delete(c);

        Workshops workshop = workshopsRepository.findById(workshopId)
            .orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        long actual = workshop.getActualNumberClasses() == null ? 1 : workshop.getActualNumberClasses();
        workshop.setActualNumberClasses(actual - 1);
        workshopsRepository.save(workshop);

        Integer newMax = classesRepository.findMaxClassNumberByWorkshop(workshopId);
        if (newMax == null || newMax == 0) {
            workshop.setActualNumberClasses(0L);
            workshopsRepository.save(workshop);
        }
    }
}


