package com.projeto_oficina2.backend.service;

import com.projeto_oficina2.backend.model.School;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.UserType;
import com.projeto_oficina2.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findByCode(String code) {
        return userRepository.findByCode(code);
    }

    public void deleteById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }
        
        userRepository.deleteById(id);
    }

    public List<User> getUsersByUserType(UserType userType) {
        return userRepository.findByUserType(userType);
    }

    public List<User> getUsersBySchool(School school) {
        return userRepository.findBySchool(school);
    }
}
