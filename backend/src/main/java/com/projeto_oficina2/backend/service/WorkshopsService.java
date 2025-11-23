package com.projeto_oficina2.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public Workshops updateWorkshops(Workshops existing, Workshops updated) {
        existing.setName(updated.getName());
        existing.setCode(updated.getCode());
        existing.setNumberClasses(updated.getNumberClasses());
        existing.setDescription(updated.getDescription());
        existing.setIsFinished(updated.getIsFinished());

        return workshopsRepository.save(existing);
    }


    public void deleteWorkshops(Long id) {
        workshopsRepository.deleteById(id);
    }

    public Workshops finalizeWorkshop(Long id) {
        Workshops workshop = workshopsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Oficina não encontrada"));

        workshop.setIsFinished(1);
        return workshopsRepository.save(workshop);
    }


    public List<Workshops> getWorkshopsByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (user.getUserType().getId() == 1) {
            return workshopsRepository.findAll();
        }

        return user.getWorkshops();
    }

    public List<User> getUsersByType(Long workshopId, int typeId) {
        Workshops workshop = workshopsRepository.findById(workshopId).orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        return workshop.getUsers().stream().filter(u -> u.getUserType().getId() == typeId).collect(Collectors.toList());
    }


}
