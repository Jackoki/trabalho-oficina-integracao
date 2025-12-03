package com.projeto_oficina2.backend.controller;

import com.projeto_oficina2.backend.model.Frequencies;
import com.projeto_oficina2.backend.dto.RollCallDTO;
import com.projeto_oficina2.backend.dto.RollCallRequest;
import com.projeto_oficina2.backend.model.ErrorResponse;
import com.projeto_oficina2.backend.service.FrequenciesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classes/{classId}/frequencies")
public class FrequenciesController {

    private final FrequenciesService frequenciesService;

    public FrequenciesController(FrequenciesService frequenciesService) {
        this.frequenciesService = frequenciesService;
    }

    @GetMapping
    public List<Frequencies> getFrequencies(@PathVariable Long classId) {
        return frequenciesService.findByClass(classId);
    }

    @GetMapping("/edit")
    public List<RollCallDTO> getRollCallForEdit(@PathVariable Long classId) {
        return frequenciesService.getRollCallForClass(classId);
    }


    @PostMapping
    public ResponseEntity<?> createOrUpdateFrequency(@PathVariable Long classId, @RequestParam Long userId, @RequestParam Boolean isPresent) {
        try {
            Frequencies frequency = frequenciesService.saveOrUpdateFrequency(classId, userId, isPresent);
            return ResponseEntity.ok(frequency);
        } 
		
		catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/save-rollcall")
    public ResponseEntity<?> saveRollCall(@PathVariable Long classId, @RequestBody List<RollCallRequest> attendances) {
        try {
            frequenciesService.saveRollCall(classId, attendances);
            return ResponseEntity.ok().build();
        }
        
        catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro ao salvar chamada: " + e.getMessage()));
        }
    }

    @PostMapping("/recalculate-workshop/{workshopId}")
    public ResponseEntity<?> recalcWorkshop(@PathVariable Long workshopId) {
        try {
            frequenciesService.recalculateWorkshopFrequency(workshopId);
            return ResponseEntity.ok().build();
        } 

        catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{frequencyId}")
    public ResponseEntity<?> deleteFrequency(@PathVariable Long classId, @PathVariable Long frequencyId) {
		
        try {
            frequenciesService.delete(frequencyId);
            return ResponseEntity.ok().build();
        } 
		
		catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
