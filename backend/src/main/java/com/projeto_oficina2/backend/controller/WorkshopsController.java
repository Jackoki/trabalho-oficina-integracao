package com.projeto_oficina2.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.projeto_oficina2.backend.model.ErrorResponse;
import com.projeto_oficina2.backend.model.User;
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

    @GetMapping("/{id}/users/by-type/{typeId}")
    public Page<User> getUsersByType(@PathVariable Long id, @PathVariable int typeId, @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size) {
        return workshopsService.getUsersByType(id, typeId, page, size);
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

        } 

        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } 
        
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Erro ao atualizar workshop: " + e.getMessage()));
        }
    }


    @DeleteMapping("/{id}")
    public void deleteWorkshops(@PathVariable Long id) {
        workshopsService.deleteWorkshops(id);
    }

    @PutMapping("/{id}/finalize")
    public ResponseEntity<Void> finalizeWorkshop(@PathVariable Long id) {
        workshopsService.finalizeWorkshop(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public Page<Workshops> getWorkshopsByUser(@PathVariable Long userId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return workshopsService.getWorkshopsByUserId(userId, page, size);
    }

    @DeleteMapping("/{workshopId}/users/{userId}")
    public ResponseEntity<?> removeUserFromWorkshop(@PathVariable Long workshopId, @PathVariable Long userId) {
        workshopsService.removeUserFromWorkshop(workshopId, userId);
        return ResponseEntity.noContent().build();
    }

}
