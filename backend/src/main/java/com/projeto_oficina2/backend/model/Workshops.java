package com.projeto_oficina2.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workshops")
public class Workshops {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String code;

    private Long number_classes;

    private int is_finished;

    private String description;

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

    public Long getNumberClasses() { 
        return number_classes; 
    }

    public void setNumberClasses(Long number_classes) { 
        this.number_classes = number_classes; 
    }

    public int getIsFinished() { 
        return is_finished; 
    }

    public void setIsFinished(int is_finished) { 
        this.is_finished = is_finished; 
    }

    public Long getDescription() { 
        return description; 
    }

    public void setDescription(Long description) { 
        this.description = description; 
    }
}
