package com.projeto_oficina2.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto_oficina2.backend.model.Classes;
import com.projeto_oficina2.backend.repository.ClassesRepository;

@Service
public class ClassesService {
    @Autowired
    private ClassesRepository classesRepository;

    public List<Classes> getAllClasses(){
        return classesRepository.findAll();
    }

    public Classes getClassesById(Long id) {
        return classesRepository.findById(id).orElse(null);
    }

    public Classes createClasses(Classes classes) {
        return classesRepository.save(classes);
    }

    public void deleteClasses(Long id) {
        classesRepository.deleteById(id);
    }
}