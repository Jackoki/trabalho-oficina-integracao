package com.projeto_oficina2.backend.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.projeto_oficina2.backend.model.UserType;
import com.projeto_oficina2.backend.model.School;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.repository.UserTypeRepository;
import com.projeto_oficina2.backend.repository.SchoolRepository;
import com.projeto_oficina2.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserTypeRepository userTypeRepository;
    private final SchoolRepository schoolRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserTypeRepository userTypeRepository, SchoolRepository schoolRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userTypeRepository = userTypeRepository;
        this.schoolRepository = schoolRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        if(userTypeRepository.findByName("Admin").isEmpty()) {
            userTypeRepository.save(new UserType("Admin"));
        }

        if(userTypeRepository.findByName("Aluno").isEmpty()) {
            userTypeRepository.save(new UserType("Aluno"));
        }

        if(userTypeRepository.findByName("Professor").isEmpty()) {
            userTypeRepository.save(new UserType("Professor"));
        }

        if(userTypeRepository.findByName("Tutor").isEmpty()) {
            userTypeRepository.save(new UserType("Tutor"));
        }

        if(schoolRepository.findByName("UTFPR-CP").isEmpty()) {
            schoolRepository.save(new School("UTFPR-CP"));
        }

        if(userRepository.findByCode("1234567").isEmpty()) {
            UserType adminType = userTypeRepository.findByName("Admin").get();
            School utfpr = schoolRepository.findByName("UTFPR-CP").get();
            
            User admin = new User();
            admin.setName("Admin");
            admin.setCode("1234567");
            admin.setPassword(passwordEncoder.encode("1234567"));
            admin.setUserType(adminType);
            admin.setSchool(utfpr);

            userRepository.save(admin);
        }

        System.out.println("Dados iniciais carregados!");
    }
}
