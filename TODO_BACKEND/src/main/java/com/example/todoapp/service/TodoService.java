package com.example.todoapp.service;

import com.example.todoapp.dto.TodoResponse;
import com.example.todoapp.mapper.TodoMapper;
import com.example.todoapp.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
