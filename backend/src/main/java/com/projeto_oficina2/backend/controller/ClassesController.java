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

import com.projeto_oficina2.backend.model.Classes;
import com.projeto_oficina2.backend.service.ClassesService;

@RestController
@RequestMapping("/classes")
public class ClassesController {
    
    @Autowired
    private ClassesService classesService;

    @GetMapping
    public List<Classes> getAllClasses() {
        return classesService.getAllClasses();
    }

    @GetMapping("/{id}")
    public Classes getClassesById(@PathVariable Long id) {
        return classesService.getClassesById(id);
    }

    @PostMapping
    public Classes createClasses(@RequestBody Classes classes) {
        return classesService.createClasses(classes);
    }

    @DeleteMapping("/{id}")
    public void deleteClasses(@PathVariable Long id) {
        classesService.deleteClasses(id);
    }
}