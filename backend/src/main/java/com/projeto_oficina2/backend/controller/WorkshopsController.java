package com.projeto_oficina2.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/user/{userId}")
    public List<Workshops> getWorkshopsByUser(@PathVariable Long userId) {
        return workshopsService.getWorkshopsByUserId(userId);
    }
}
