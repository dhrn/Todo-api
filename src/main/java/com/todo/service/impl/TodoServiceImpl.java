package com.todo.service.impl;

import com.todo.domain.Todos;
import com.todo.repository.TodosRepository;
import com.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    TodosRepository todosRepository;

    // TODO get All implementation
    @Override
    public List<Todos> getAllTodos() {
        return  todosRepository.findAll();
    }

    // TODO get All by ID implementation
    @Override
    public Optional<Todos> getAllTodosById(Integer id) {
        return todosRepository.findById(id);
    }

    // TODO Create Todo implementation
    @Override
    public Todos  createTodo(Todos todo) {
        return todosRepository.save(todo);
    }

    // TODO update Todo implementation
    @Override
    public Todos  updateTodo(Integer id, Todos todo) {
        return todosRepository.save(todo);
    }

    // TODO delete Todo implementation
    @Override
    public Optional<Todos> deleteTodo(Integer id) {
        return todosRepository.findById(id);
    }
}
