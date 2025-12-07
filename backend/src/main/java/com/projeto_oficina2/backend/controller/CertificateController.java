package com.projeto_oficina2.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto_oficina2.backend.service.CertificateService;

@RestController
@RequestMapping("/certificate")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @GetMapping("/{userId}/{workshopId}")
    public ResponseEntity<?> generateCertificate(@PathVariable Long userId, @PathVariable Long workshopId) {

        try {
            byte[] image = certificateService.generateCertificate(userId, workshopId);

            return ResponseEntity.ok().header("Content-Type", "image/png").header("Content-Disposition", "inline; filename=certificado.png").body(image);
        } 
        
        catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }


}
