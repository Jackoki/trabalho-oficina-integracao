package com.projeto_oficina2.backend.dto;

import com.projeto_oficina2.backend.model.School;
import com.projeto_oficina2.backend.model.UserType;

public record UserDTO(Long id, String name, String code, UserType userType, School school) {
    
}
