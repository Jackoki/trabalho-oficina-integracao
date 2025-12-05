package com.projeto_oficina2.backend.controller;

import com.projeto_oficina2.backend.model.ErrorResponse;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.UserType;
import com.projeto_oficina2.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public Page<User> getUsersByType(@PathVariable UserType userType, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        if (page < 0) 
            page = 0;

        if (size <= 0) 
            size = 5;

        return userService.getUsersByUserType(userType, PageRequest.of(page, size));
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User savedUser = userService.save(user);
            return ResponseEntity.ok(savedUser);
        } 
        
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            Optional<User> existingUserOpt = userService.findById(id);
            if (existingUserOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Usuário não encontrado"));
            }

            User existingUser = existingUserOpt.get();
            existingUser.setName(updatedUser.getName());
            existingUser.setCode(updatedUser.getCode());
            existingUser.setUserType(updatedUser.getUserType());
            existingUser.setSchool(updatedUser.getSchool());

            User savedUser = userService.update(existingUser);
            return ResponseEntity.ok(savedUser);

        } 
        
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } 
        
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Erro ao atualizar usuário: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }
}
