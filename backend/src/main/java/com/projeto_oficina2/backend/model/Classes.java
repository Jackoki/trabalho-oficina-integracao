package com.projeto_oficina2.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "classes")
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long id_workshops;

    @Column(nullable = false)
    private int class_number;

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public Long getIdWorkshops() { 
        return id_workshops; 
    }

    public void setIdWorkshops(Long id_workshops) { 
        this.id_workshops = id_workshops; 
    }

    public int getClassNumber() { 
        return class_number; 
    }

    public void setClassNumber(int class_number) { 
        this.class_number = class_number; 
    }
}