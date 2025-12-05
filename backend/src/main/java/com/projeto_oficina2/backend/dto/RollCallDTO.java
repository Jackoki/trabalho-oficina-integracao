package com.projeto_oficina2.backend.dto;

public class RollCallDTO {
    private Long userId;
    private String userName;
    private Boolean isPresent;

    public RollCallDTO(Long userId, String userName, Boolean isPresent) {
        this.userId = userId;
        this.userName = userName;
        this.isPresent = isPresent;
    }

    public Long getUserId() { return userId; }
    public String getUserName() { return userName; }
    public Boolean getIsPresent() { return isPresent; }
}
