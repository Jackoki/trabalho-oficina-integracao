package com.projeto_oficina2.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "classes")
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_workshops", nullable = false)
    private Workshops workshop;

    @Column(nullable = false)
    private int class_number;

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public Workshops getWorkshop() { 
        return workshop; 
    }

    public void setWorkshop(Workshops workshop) { 
        this.workshop = workshop; 
    }

    public int getClassNumber() { 
        return class_number; 
    }

    public void setClassNumber(int class_number) { 
        this.class_number = class_number; 
    }
}