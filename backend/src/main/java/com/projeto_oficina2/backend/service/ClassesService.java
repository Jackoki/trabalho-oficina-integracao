package com.projeto_oficina2.backend.service;

import com.projeto_oficina2.backend.model.Classes;
import com.projeto_oficina2.backend.model.Workshops;
import com.projeto_oficina2.backend.repository.ClassesRepository;
import com.projeto_oficina2.backend.repository.WorkshopsRepository;
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

    public java.util.List<Classes> findAll() {
        return classesRepository.findAll();
    }

    public Page<Classes> paginateByWorkshop(Long workshopId, int page, int size) {
        if (page < 0) 
			page = 0;
		
        if (size <= 0) 
			size = 10;

        Workshops workshop = workshopsRepository.findById(workshopId).orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        Pageable pageable = PageRequest.of(page, size);
        return classesRepository.findByWorkshop(workshop, pageable);
    }

    public Long countClassesDone(Long workshopId) {
        return classesRepository.countByWorkshop(workshopId);
    }


    public Classes save(Long workshopId, Integer classNumber) {

        Workshops workshop = workshopsRepository.findById(workshopId).orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        if (classNumber == null) {
            throw new IllegalArgumentException("class_number não pode ser nulo");
        }

        Classes newClass = new Classes();
        newClass.setClassNumber(classNumber);
        newClass.setWorkshop(workshop);

        workshop.setNumberClasses(workshop.getNumberClasses() + 1);
        workshopsRepository.save(workshop);

        return classesRepository.save(newClass);
    }

    public void deleteById(Long classId) {
        Classes c = classesRepository.findById(classId).orElseThrow(() -> new RuntimeException("Classe não encontrada"));

        Workshops workshop = c.getWorkshop();
        workshop.setNumberClasses(workshop.getNumberClasses() - 1);
        workshopsRepository.save(workshop);

        classesRepository.deleteById(classId);
    }
}
