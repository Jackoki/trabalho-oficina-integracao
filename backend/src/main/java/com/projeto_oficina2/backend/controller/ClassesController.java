package com.projeto_oficina2.backend.controller;

import com.projeto_oficina2.backend.model.Classes;
import com.projeto_oficina2.backend.model.ErrorResponse;
import com.projeto_oficina2.backend.service.ClassesService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workshops/{id}/classes")
public class ClassesController {

    private final ClassesService classesService;

    public ClassesController(ClassesService classesService) {
        this.classesService = classesService;
    }

    @GetMapping
    public Page<Classes> getClasses(@PathVariable("id") Long workshopId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return classesService.paginateByWorkshop(workshopId, page, size);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countClassesDone(@PathVariable("id") Long workshopId) {
        Long count = classesService.countClassesDone(workshopId);
        return ResponseEntity.ok(count);
    }


    @PostMapping
    public ResponseEntity<?> createClass(@PathVariable("id") Long workshopId, @RequestParam Integer class_number) {
        try {
            Classes saved = classesService.save(workshopId, class_number);
            return ResponseEntity.ok(saved);
        } 
		
		catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{classId}")
    public ResponseEntity<?> deleteClass(@PathVariable("id") Long workshopId, @PathVariable Long classId) {
        try {
            classesService.deleteById(classId);
            return ResponseEntity.ok().build();
        } 
		
		catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("Erro ao deletar classe: " + e.getMessage()));
        }
    }
}
