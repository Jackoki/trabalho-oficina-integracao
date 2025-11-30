package com.projeto_oficina2.backend.controller;

import com.projeto_oficina2.backend.model.Classes;
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
    public ResponseEntity<Page<Classes>> getClasses(@PathVariable("id") Long workshopId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(classesService.paginateByWorkshop(workshopId, page, size));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countClasses(@PathVariable("id") Long workshopId) {
        return ResponseEntity.ok(classesService.countClassesDone(workshopId));
    }

    @PostMapping
    public ResponseEntity<Classes> createClass(@PathVariable("id") Long workshopId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classesService.createNextClass(workshopId));
    }

    @DeleteMapping("/{classId}")
    public ResponseEntity<Void> deleteClass(
        @PathVariable("id") Long workshopId,
        @PathVariable Long classId
    ) {
        classesService.deleteClass(workshopId, classId);
        return ResponseEntity.noContent().build();
    }
}

