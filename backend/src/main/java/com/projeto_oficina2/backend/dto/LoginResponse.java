package com.projeto_oficina2.backend.dto;

import com.projeto_oficina2.backend.model.User;

public class LoginResponse {
    private boolean success;
    private String message;
    private User user;

    public LoginResponse() {}

    public LoginResponse(boolean success, String message, User user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

    public boolean isSuccess() { 
        return success; 
    }

    public void setSuccess(boolean success) { 
        this.success = success; 
    }

    public String getMessage() { 
        return message; 
    }

    public void setMessage(String message) { 
        this.message = message; 
    }

    public User getUser() { 
        return user; 
    }

    public void setUser(User user) { 
        this.user = user; 
    }
}
