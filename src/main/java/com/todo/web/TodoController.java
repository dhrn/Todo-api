package com.todo.web;

import com.todo.domain.Todos;
import com.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TodoController {

    @Autowired
    TodoService todoService;

    @RequestMapping("/hello")
    public String getHello() {
        return "hell dhrn";
    }

    @RequestMapping("/todos")
    @ResponseBody
    public List<Todos> getAllTodos() {
        return todoService.getAllTodos();
    }

    @RequestMapping("/todos/{id}")
    @ResponseBody
    public Optional<Todos> getTodosById(@PathVariable Integer id) {
        return todoService.getAllTodosById(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/todos")
    @ResponseBody
    public Todos createTodo(@RequestBody Todos todo) {
        return todoService.createTodo(todo);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/todos/{id}")
    @ResponseBody
    public Todos updateTodo(@RequestBody Todos todo, @PathVariable Integer id) {
        return todoService.updateTodo(id, todo);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/todos/{id}")
    @ResponseBody
    public Optional<Todos> updateTodo(@PathVariable Integer id) {
        return todoService.deleteTodo(id);
    }
}
