package com.todo.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

@Entity
public class Todos {

    @javax.persistence.Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String description;

    public Todos(Integer id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Todos() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
