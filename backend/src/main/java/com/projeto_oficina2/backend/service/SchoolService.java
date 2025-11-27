package com.projeto_oficina2.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto_oficina2.backend.model.School;
import com.projeto_oficina2.backend.repository.SchoolRepository;
import com.projeto_oficina2.backend.repository.UserRepository;

@Service
public class SchoolService {
    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private UserRepository userRepository;

    public List<School> getAllSchools(){
        return schoolRepository.findAll();
    }

    public School getSchoolById(Long id) {
        return schoolRepository.findById(id).orElse(null);
    }

    public School createSchool(School school) {
        return schoolRepository.save(school);
    }
    
    public School updateSchool(Long id, School school) {
        School existingSchool = schoolRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Escola não encontrada"));

        existingSchool.setName(school.getName());

        return schoolRepository.save(existingSchool);
    }

    public void deleteSchool(Long id) {
        School school = schoolRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Escola não encontrada"));

        if (!userRepository.findBySchool(school).isEmpty()) {
            throw new IllegalArgumentException("Não é possível deletar a escola: existem usuários vinculados.");
        }

        schoolRepository.delete(school);
    }

}
