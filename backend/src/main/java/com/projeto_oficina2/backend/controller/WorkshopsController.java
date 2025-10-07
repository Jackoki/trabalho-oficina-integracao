package com.projeto_oficina2.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto_oficina2.backend.model.Workshops;
import com.projeto_oficina2.backend.service.WorkshopsService;

@RestController
@RequestMapping("/workshops")
public class WorkshopsController {
    
    @Autowired
    private WorkshopsService workshopsService;

    @GetMapping
    public List<Workshops> getAllWorkshops() {
        return workshopsService.getAllWorkshops();
    }

    @GetMapping("/{id}")
    public Workshops getWorkshopsById(@PathVariable Long id) {
        return workshopsService.getWorkshopsById(id);
    }

    @PostMapping
    public Workshops createWorkshops(@RequestBody Workshops workshops) {
        return workshopsService.createWorkshops(workshops);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkshops(@PathVariable Long id) {
        workshopsService.deleteWorkshops(id);
    }
}