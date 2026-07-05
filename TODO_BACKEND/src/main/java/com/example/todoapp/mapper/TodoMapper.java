package com.example.todoapp.mapper;

import com.example.todoapp.dto.TodoResponse;
import com.example.todoapp.entity.Todo;
import org.springframework.stereotype.Component;

@Component
public class TodoMapper {
    public TodoResponse toResponse(Todo todo) {
        return TodoResponse.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.isCompleted())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }
}
