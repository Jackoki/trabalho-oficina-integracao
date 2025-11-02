package com.projeto_oficina2.backend.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;

import com.projeto_oficina2.backend.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.projeto_oficina2.backend.model.User user =
                userRepository.findByCode(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        List<GrantedAuthority> authorities = new ArrayList<>();

        switch (user.getUserType().getId().intValue()) {
            case 1 -> authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            case 2 -> authorities.add(new SimpleGrantedAuthority("ROLE_ALUNO"));
            case 3 -> authorities.add(new SimpleGrantedAuthority("ROLE_PROFESSOR"));
            case 4 -> authorities.add(new SimpleGrantedAuthority("ROLE_TUTOR"));
        }

        return new org.springframework.security.core.userdetails.User(
                user.getCode(),
                user.getPassword(),
                authorities
        );
    }
}
