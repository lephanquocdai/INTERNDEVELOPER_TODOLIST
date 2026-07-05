package com.example.todoapp.service;

import com.example.todoapp.dto.TodoRequest;
import com.example.todoapp.dto.TodoResponse;
import com.example.todoapp.entity.Todo;
import com.example.todoapp.mapper.TodoMapper;
import com.example.todoapp.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @Mock
    private TodoMapper todoMapper;

    @InjectMocks
    private TodoService todoService;

    private Todo todo;
    private TodoRequest todoRequest;
    private TodoResponse todoResponse;

    @BeforeEach
    void setUp() {
        todo = new Todo();
        todo.setId(1L);
        todo.setTitle("Test Task");
        todo.setDescription("Test Description");
        todo.setCompleted(false);

        todoRequest = new TodoRequest();
        todoRequest.setTitle("Test Task");
        todoRequest.setDescription("Test Description");

        todoResponse = TodoResponse.builder()
                .id(1L)
                .title("Test Task")
                .description("Test Description")
                .completed(false)
                .build();
    }

    @Test
    void getTodos_ShouldReturnPagedTodos() {
        // Arrange
        PageRequest pageable = PageRequest.of(0, 10);
        Page<Todo> todoPage = new PageImpl<>(List.of(todo));
        
        when(todoRepository.filterTodos("all", "Test", pageable)).thenReturn(todoPage);
        when(todoMapper.toResponse(todo)).thenReturn(todoResponse);

        // Act
        Page<TodoResponse> result = todoService.getTodos("all", "Test", pageable);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Test Task", result.getContent().get(0).getTitle());
        
        verify(todoRepository, times(1)).filterTodos("all", "Test", pageable);
        verify(todoMapper, times(1)).toResponse(todo);
    }

    @Test
    void createTodo_ShouldSaveAndReturnTodo() {
        // Arrange
        when(todoRepository.save(any(Todo.class))).thenReturn(todo);
        when(todoMapper.toResponse(todo)).thenReturn(todoResponse);

        // Act
        TodoResponse result = todoService.createTodo(todoRequest);

        // Assert
        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        
        verify(todoRepository, times(1)).save(any(Todo.class));
        verify(todoMapper, times(1)).toResponse(todo);
    }

    @Test
    void updateTodo_WhenExists_ShouldUpdateAndReturn() {
        // Arrange
        TodoRequest updateRequest = new TodoRequest();
        updateRequest.setTitle("Updated Title");
        updateRequest.setDescription("Updated Desc");

        Todo updatedTodo = new Todo();
        updatedTodo.setId(1L);
        updatedTodo.setTitle("Updated Title");
        updatedTodo.setDescription("Updated Desc");
        updatedTodo.setCompleted(false);

        TodoResponse updatedResponse = TodoResponse.builder()
                .id(1L)
                .title("Updated Title")
                .description("Updated Desc")
                .completed(false)
                .build();

        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));
        when(todoRepository.save(any(Todo.class))).thenReturn(updatedTodo);
        when(todoMapper.toResponse(updatedTodo)).thenReturn(updatedResponse);

        // Act
        TodoResponse result = todoService.updateTodo(1L, updateRequest);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());
        
        verify(todoRepository, times(1)).findById(1L);
        verify(todoRepository, times(1)).save(any(Todo.class));
    }

    @Test
    void updateTodo_WhenNotFound_ShouldThrowException() {
        // Arrange
        when(todoRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            todoService.updateTodo(99L, todoRequest);
        });
        
        assertEquals("Todo not found", exception.getMessage());
        verify(todoRepository, times(1)).findById(99L);
        verify(todoRepository, never()).save(any(Todo.class));
    }

    @Test
    void deleteTodo_WhenExists_ShouldDelete() {
        // Arrange
        when(todoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(todoRepository).deleteById(1L);

        // Act
        todoService.deleteTodo(1L);

        // Assert
        verify(todoRepository, times(1)).existsById(1L);
        verify(todoRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteTodo_WhenNotFound_ShouldThrowException() {
        // Arrange
        when(todoRepository.existsById(99L)).thenReturn(false);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            todoService.deleteTodo(99L);
        });
        
        verify(todoRepository, times(1)).existsById(99L);
        verify(todoRepository, never()).deleteById(anyLong());
    }

    @Test
    void toggleStatus_ShouldReverseCompletedStatus() {
        // Arrange
        assertFalse(todo.isCompleted()); // Initially false
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));
        
        Todo toggledTodo = new Todo();
        toggledTodo.setId(1L);
        toggledTodo.setTitle(todo.getTitle());
        toggledTodo.setDescription(todo.getDescription());
        toggledTodo.setCompleted(true); // Toggled
        
        when(todoRepository.save(any(Todo.class))).thenReturn(toggledTodo);
        
        TodoResponse toggledResponse = TodoResponse.builder()
                .id(1L)
                .title(todo.getTitle())
                .completed(true)
                .build();
        when(todoMapper.toResponse(toggledTodo)).thenReturn(toggledResponse);

        // Act
        TodoResponse result = todoService.toggleStatus(1L);

        // Assert
        assertTrue(result.isCompleted());
        verify(todoRepository, times(1)).findById(1L);
        verify(todoRepository, times(1)).save(any(Todo.class));
    }
}
