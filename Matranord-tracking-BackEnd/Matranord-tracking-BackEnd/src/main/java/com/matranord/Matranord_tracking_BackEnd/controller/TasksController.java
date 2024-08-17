package com.matranord.Matranord_tracking_BackEnd.controller;

import com.matranord.Matranord_tracking_BackEnd.model.Tasks;
import com.matranord.Matranord_tracking_BackEnd.services.TasksService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {
    @Autowired
    private TasksService tasksService;

    private static final Logger logger = LoggerFactory.getLogger(TruckController.class);

    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        try {
            logger.info("Fetching all trucks");
            List<Tasks> tasks = tasksService.getAllTasks();
            logger.info("Fetched {} taskss", tasks.size());
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("Error fetching taskss", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching taskss: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Optional<Tasks> getTasksById(@PathVariable String id) {
        return tasksService.getTasksById(id);
    }

//    @PostMapping()
//    public Tasks createTasks(@RequestBody Tasks tasks) {
//        return tasksService.createTasks(tasks);
//    }

//    @PutMapping("/{id}")
//    public Tasks updateTasks(@PathVariable String id, @RequestBody Tasks tasksDetails) {
//        Optional<Tasks> tasks = tasksService.getTasksById(id);
//        // Update tasks properties
//        return tasksService.createTasks(tasks.orElse(null));
//    }

    @PostMapping
    public ResponseEntity<Tasks> createTask(@RequestBody Tasks task, @RequestParam String driverCIN) {
        Tasks createdTask = tasksService.createTask(task, driverCIN);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tasks> getTask(@PathVariable String id) {
        return tasksService.getTasksById(id)
                .map(task -> new ResponseEntity<>(task, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/driver/{driverCIN}")
    public ResponseEntity<List<Tasks>> getTasksByDriverCIN(@PathVariable String driverCIN) {
        List<Tasks> tasks = tasksService.getTasksByDriverCIN(driverCIN);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tasks> updateTask(@PathVariable String id, @RequestBody Tasks task) {
        return tasksService.getTasksById(id)
                .map(existingTask -> {
                    task.setId(id);
                    Tasks updatedTask = tasksService.updateTasks(task);
                    return new ResponseEntity<>(updatedTask, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        tasksService.deleteTasks(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
