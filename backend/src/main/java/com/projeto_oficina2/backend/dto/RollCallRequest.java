package com.projeto_oficina2.backend.dto;

public class RollCallRequest {
    private Long userId;
    private Boolean isPresent;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Boolean getIsPresent() {
        return isPresent;
    }

    public void setIsPresent(Boolean present) {
        isPresent = present;
    }
}