package com.projeto_oficina2.backend.dto;

public class LoginRequest {
    private String accessCode;
    private String password;

    public String getAccessCode() { 
        return accessCode; 
    }

    public void setAccessCode(String accessCode) { 
        this.accessCode = accessCode; 
    }

    public String getPassword() { 
        return password; 
    }

    public void setPassword(String password) { 
        this.password = password; 
    }
    
}
