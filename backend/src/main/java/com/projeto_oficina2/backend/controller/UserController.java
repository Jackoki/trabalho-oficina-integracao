package com.projeto_oficina2.backend.controller;

import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.UserType;
import com.projeto_oficina2.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/code/{code}")
    public Optional<User> getUserByCode(@PathVariable String code) {
        return userService.findByCode(code);
    }

    @GetMapping("/type/{userType}")
    public List<User> getUsersByType(@PathVariable UserType userType) {
        return userService.getUsersByUserType(userType);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }
}
