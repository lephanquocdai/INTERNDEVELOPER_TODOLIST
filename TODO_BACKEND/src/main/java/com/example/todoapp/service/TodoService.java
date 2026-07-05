package com.example.todoapp.service;

import com.example.todoapp.dto.TodoResponse;
import com.example.todoapp.mapper.TodoMapper;
import com.example.todoapp.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.todoapp.dto.TodoRequest;
import com.example.todoapp.entity.Todo;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    public List<TodoResponse> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(todoMapper::toResponse)
                .collect(Collectors.toList());
    }

    public TodoResponse createTodo(TodoRequest request) {
        Todo todo = Todo.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .completed(false)
                .build();
        return todoMapper.toResponse(todoRepository.save(todo));
    }

    public TodoResponse updateTodo(Long id, TodoRequest request) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        return todoMapper.toResponse(todoRepository.save(todo));
    }
}
