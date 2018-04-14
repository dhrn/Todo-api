package com.todo.repository;

import com.todo.domain.Todos;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TodosRepository extends CrudRepository<Todos, Integer> {

    public List<Todos> findAll();

}
