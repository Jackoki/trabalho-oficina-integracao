package com.projeto_oficina2.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "workshops")
public class Workshops {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String code;

    @OneToMany(mappedBy = "workshop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Classes> classes;

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

    public List<Classes> getClasses() { 
        return classes; 
    }

    public void setClasses(List<Classes> classes) { 
        this.classes = classes; 
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

    public String getDescription() { 
        return description; 
    }

    public void setDescription(String description) { 
        this.description = description; 
    }
}
