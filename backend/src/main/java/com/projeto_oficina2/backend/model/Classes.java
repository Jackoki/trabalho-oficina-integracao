package com.projeto_oficina2.backend.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "classes")
public class Classes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "class_number", nullable = false)
    private Integer classNumber;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_workshops", nullable = false)
    @JsonBackReference
    private Workshops workshop;

    @OneToMany(mappedBy = "classes", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Frequencies> frequencies;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getClassNumber() { return classNumber; }
    public void setClassNumber(Integer classNumber) { this.classNumber = classNumber; }

    public Workshops getWorkshop() { return workshop; }
    public void setWorkshop(Workshops workshop) { this.workshop = workshop; }

    public List<Frequencies> getFrequencies() { return frequencies; }
    public void setFrequencies(List<Frequencies> frequencies) { this.frequencies = frequencies; }
}
