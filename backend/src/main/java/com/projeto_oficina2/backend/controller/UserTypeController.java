package com.projeto_oficina2.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto_oficina2.backend.model.UserType;
import com.projeto_oficina2.backend.service.UserTypeService;

@RestController
@RequestMapping("/usertype")
public class UserTypeController {
    
    @Autowired
    private UserTypeService userTypeService;

    @GetMapping
    public List<UserType> getAllUsers() {
        return userTypeService.getAllUserTypes();
    }

    @GetMapping("/{id}")
    public UserType getUserTypeById(@PathVariable Long id) {
        return userTypeService.getUserTypeById(id);
    }

    @PostMapping
    public UserType createUserType(@RequestBody UserType usertype) {
        return userTypeService.createUserType(usertype);
    }

    @DeleteMapping("/{id}")
    public void deleteUserType(@PathVariable Long id) {
        userTypeService.deleteUserType(id);
    }
}
