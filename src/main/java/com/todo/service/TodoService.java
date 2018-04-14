package com.todo.service;
import com.todo.domain.Todos;


import java.util.List;
import java.util.Optional;

public interface TodoService {


    // TODO get All implementation
    public List<Todos> getAllTodos();

    // TODO get All by ID implementation
    public Optional<Todos> getAllTodosById(Integer id);

    // TODO Create Todo implementation
    public Todos  createTodo(Todos todo);

    // TODO update Todo implementation
    public Todos  updateTodo(Integer id, Todos todo);

    // TODO delete Todo implementation
    public Optional<Todos> deleteTodo(Integer id);
}
