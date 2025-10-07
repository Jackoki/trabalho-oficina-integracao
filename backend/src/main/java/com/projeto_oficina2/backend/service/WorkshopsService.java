package com.projeto_oficina2.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto_oficina2.backend.model.Workshops;
import com.projeto_oficina2.backend.repository.WorkshopsRepository;

@Service
public class WorkshopsService {
    @Autowired
    private WorkshopsRepository workshopsRepository;

    public List<Workshops> getAllWorkshops(){
        return workshopsRepository.findAll();
    }

    public Workshops getWorkshopsById(Long id) {
        return workshopsRepository.findById(id).orElse(null);
    }

    public Workshops createWorkshops(Workshops workshops) {
        return workshopsRepository.save(workshops);
    }

    public void deleteWorkshops(Long id) {
        workshopsRepository.deleteById(id);
    }
}