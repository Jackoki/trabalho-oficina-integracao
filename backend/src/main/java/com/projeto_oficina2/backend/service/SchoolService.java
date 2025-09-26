package com.projeto_oficina2.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto_oficina2.backend.model.School;
import com.projeto_oficina2.backend.repository.SchoolRepository;

@Service
public class SchoolService {
    @Autowired
    private SchoolRepository schoolRepository;

    public List<School> getAllSchools(){
        return schoolRepository.findAll();
    }

    public School getSchoolById(Long id) {
        return schoolRepository.findById(id).orElse(null);
    }

    public School createSchool(School school) {
        return schoolRepository.save(school);
    }

    public void deleteSchool(Long id) {
        schoolRepository.deleteById(id);
    }
}
