package com.projeto_oficina2.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "frequencies")
public class Frequencies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_present", nullable = false)
    private Boolean isPresent;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_classes", nullable = false)
    @JsonBackReference
    private Classes classes;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_users", nullable = false)
    private User user;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Boolean getIsPresent() { return isPresent; }
    public void setIsPresent(Boolean present) { isPresent = present; }

    public Classes getClasses() { return classes; }
    public void setClasses(Classes classes) { this.classes = classes; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
