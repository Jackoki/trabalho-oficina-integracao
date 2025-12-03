package com.projeto_oficina2.backend.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.UserType;
import com.projeto_oficina2.backend.model.Workshops;
import com.projeto_oficina2.backend.repository.UserRepository;
import com.projeto_oficina2.backend.repository.WorkshopsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import jakarta.transaction.Transactional;
import com.projeto_oficina2.backend.repository.ClassesRepository;

@Service
public class WorkshopsService {

    @Autowired
    private WorkshopsRepository workshopsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassesRepository classesRepository;

    public List<Workshops> getAllWorkshops() {
        return workshopsRepository.findAll();
    }

    public Workshops getWorkshopsById(Long id) {
        return workshopsRepository.findById(id).orElse(null);
    }

    public Page<Workshops> getWorkshopsByUserId(Long userId, int page, int size) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Pageable pageable = PageRequest.of(page, size);

        if (user.getUserType().getId() == 1) {
            return workshopsRepository.findAll(pageable);
        }

        List<Workshops> list = user.getWorkshops();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), list.size());

        List<Workshops> paginatedList = start <= end ? list.subList(start, end) : Collections.emptyList();

        return new PageImpl<>(paginatedList, pageable, list.size());
    }

    public Page<User> getUsersByType(Long workshopId, int typeId, int page, int size) {
        Workshops workshop = workshopsRepository.findById(workshopId)
            .orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        List<User> filtered = workshop.getUsers().stream()
            .filter(u -> u.getUserType().getId() == typeId)
            .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, size);

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), filtered.size());

        List<User> paginatedList =
            start <= end ? filtered.subList(start, end) : Collections.emptyList();

        return new PageImpl<>(paginatedList, pageable, filtered.size());
    }
    
    public Page<User> getUsersNotLinkedByType(Long workshopId, Long typeId, int page, int size) {
        Workshops workshop = workshopsRepository.findById(workshopId).orElseThrow(() -> new RuntimeException("Workshop não encontrada"));

        List<Long> linkedIds = workshop.getUsers().stream().map(User::getId).collect(Collectors.toList());

        UserType type = new UserType();
        type.setId(typeId);

        List<User> filtered = userRepository.findByUserType(type).stream().filter(u -> !linkedIds.contains(u.getId())).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, size);

        int start = (int) Math.min((long) pageable.getOffset(), (long) filtered.size());
        int end = Math.min(start + pageable.getPageSize(), filtered.size());

        List<User> paginated;

        if (start >= end) {
            paginated = Collections.emptyList();
        } 
        
        else {
            paginated = filtered.subList(start, end);
        }

        return new PageImpl<>(paginated, pageable, filtered.size());
    }

    public Workshops createWorkshops(Workshops workshops) {
        return workshopsRepository.save(workshops);
    }

    public void linkUserToWorkshop(Long workshopId, Long userId) {
        Workshops workshop = workshopsRepository.findById(workshopId).orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!workshop.getUsers().contains(user)) {
            workshop.getUsers().add(user);
            workshopsRepository.save(workshop);
        }
    }

    public void removeUserFromWorkshop(Long workshopId, Long userId) {

        Workshops workshop = workshopsRepository.findById(workshopId)
            .orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        workshop.getUsers().remove(user);

        workshopsRepository.save(workshop);
    }

    public Workshops updateWorkshops(Workshops existing, Workshops updated) {
        existing.setName(updated.getName());
        existing.setCode(updated.getCode());
        existing.setNumberClasses(updated.getNumberClasses());
        existing.setDescription(updated.getDescription());
        existing.setIsFinished(updated.getIsFinished());

        return workshopsRepository.save(existing);
    }
        
    @Transactional
    public Workshops finalizeWorkshop(Long id) {
        Workshops workshop = workshopsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Oficina não encontrada"));
        Long numberClasses = workshop.getNumberClasses();
        Long realCount = classesRepository.countClassesByWorkshop(id);

        if (numberClasses == null || !numberClasses.equals(realCount)) {
            String msg = String.format(
                "Não é possível concluir a oficina: aulas previstas = %s, aulas registradas = %s",
                numberClasses == null ? "null" : numberClasses.toString(),
                realCount == null ? "null" : realCount.toString()
            );
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, msg);
        }

        workshop.setIsFinished(1);
        return workshopsRepository.save(workshop);
    }


    public void deleteWorkshops(Long id) {
        workshopsRepository.deleteById(id);
    }


}
