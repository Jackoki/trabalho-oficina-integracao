package com.projeto_oficina2.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.Workshops;
import com.projeto_oficina2.backend.repository.UserRepository;
import com.projeto_oficina2.backend.repository.WorkshopsRepository;

@Service
public class WorkshopsService {

    @Autowired
    private WorkshopsRepository workshopsRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Workshops> getAllWorkshops() {
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

    public List<Workshops> getWorkshopsByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (user.getUserType().getId() == 1) {
            return workshopsRepository.findAll();
        }

        return user.getWorkshops();
    }
}
