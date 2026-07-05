package com.example.todoapp.repository;

import com.example.todoapp.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("SELECT t FROM Todo t WHERE " +
           "(:status IS NULL OR " +
           "(:status = 'completed' AND t.completed = true) OR " +
           "(:status = 'pending' AND t.completed = false)) " +
           "AND (:keyword IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Todo> filterTodos(@Param("status") String status, @Param("keyword") String keyword, Pageable pageable);
}
