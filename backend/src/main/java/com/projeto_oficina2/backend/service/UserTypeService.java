package com.projeto_oficina2.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto_oficina2.backend.model.UserType;
import com.projeto_oficina2.backend.repository.UserTypeRepository;

@Service
public class UserTypeService {
    @Autowired
    private UserTypeRepository usertypeRepository;

    public List<UserType> getAllUserTypes(){
        return usertypeRepository.findAll();
    }

    public UserType getUserTypeById(Long id) {
        return usertypeRepository.findById(id).orElse(null);
    }

    public UserType createUserType(UserType usertype) {
        return usertypeRepository.save(usertype);
    }

    public void deleteUserType(Long id) {
        usertypeRepository.deleteById(id);
    }
}
