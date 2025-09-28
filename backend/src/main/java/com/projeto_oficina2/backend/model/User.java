package com.projeto_oficina2.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_users_types", nullable = false)
    private UserType userType;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_schools", nullable = false)
    private School school;

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public String getName() { 
        return name; 
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public String getCode() { 
        return code; 
    }

    public void setCode(String code) { 
        this.code = code; 
    }

    public String getPassword() { 
        return password; 
    }

    public void setPassword(String password) { 
        this.password = password; 
    }

    public UserType getUserType() { 
        return userType; 
    }

    public void setUserType(UserType userType) { 
        this.userType = userType; 
    }

    public School getSchool() { 
        return school; 
    }

    public void setSchool(School school) { 
        this.school = school; 
    }
}
