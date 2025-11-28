package com.projeto_oficina2.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "frequencies_students")
public class FrequenciesStudents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "frequency", nullable = false)
    private Double frequency;

    @Column(name = "is_approved", nullable = false)
    private Boolean isApproved;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_users", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_workshops", nullable = false)
    private Workshops workshop;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getFrequency() {
        return frequency;
    }

    public void setFrequency(Double frequency) {
        this.frequency = frequency;
        this.isApproved = frequency >= 75;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Workshops getWorkshop() {
        return workshop;
    }

    public void setWorkshop(Workshops workshop) {
        this.workshop = workshop;
    }
}
