package com.projeto_oficina2.backend.service;

import com.projeto_oficina2.backend.model.School;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.UserType;
import com.projeto_oficina2.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

    
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    public Optional<User> findByCode(String code) {
        return userRepository.findByCode(code);
    }
    
    public Optional<User> findByCodeExcludingId(String code, Long id) {
        return userRepository.findByCodeExcludingId(code, id);
    }

    public List<User> getUsersByUserType(UserType userType) {
        return userRepository.findByUserType(userType);
    }

    public List<User> getUsersBySchool(School school) {
        return userRepository.findBySchool(school);
    }

    public Page<User> getUsersByUserType(UserType userType, Pageable pageable) {
        return userRepository.findByUserType(userType, pageable);
    }

    public User save(User user) {
        if (userRepository.findByCode(user.getCode()).isPresent()) {
            throw new IllegalArgumentException("Código já cadastrado!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User update(User user) {
        Optional<User> other = userRepository.findByCodeExcludingId(user.getCode(), user.getId());
        if (other.isPresent()) {
            throw new IllegalArgumentException("Código já cadastrado!");
        }
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }
        
        userRepository.deleteById(id);
    }
}
