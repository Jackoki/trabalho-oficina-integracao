package com.projeto_oficina2.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto_oficina2.backend.model.ErrorResponse;
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

    @PutMapping("/{id}")
    public ResponseEntity<?> updateWorkshops(@PathVariable Long id, @RequestBody Workshops updatedWorkshop) {
        try {
            Workshops existingWorkshop = workshopsService.getWorkshopsById(id);
            if (existingWorkshop == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Workshop não encontrado"));
            }

            Workshops savedWorkshop = workshopsService.updateWorkshops(existingWorkshop, updatedWorkshop);
            return ResponseEntity.ok(savedWorkshop);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Erro ao atualizar workshop: " + e.getMessage()));
        }
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
