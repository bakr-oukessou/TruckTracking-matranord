package com.matranord.Matranord_tracking_BackEnd.controller;

import com.matranord.Matranord_tracking_BackEnd.model.DTO.TaskDTO;
import com.matranord.Matranord_tracking_BackEnd.model.Tasks;
import com.matranord.Matranord_tracking_BackEnd.repository.TasksRepository;
import com.matranord.Matranord_tracking_BackEnd.services.TasksService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {
    @Autowired
    private TasksService tasksService;
    @Autowired
    private TasksRepository tasksRepository;

    private static final Logger logger = LoggerFactory.getLogger(TruckController.class);

//    @GetMapping
//    public ResponseEntity<?> getAllTasks() {
//        try {
//            logger.info("Fetching all tasks");
//            List<Tasks> tasks = tasksService.getAllTasks();
//            logger.info("Fetched {} tasks", tasks.size());
//            return ResponseEntity.ok(tasks);
//        } catch (Exception e) {
//            logger.error("Error fetching tasks", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error fetching tasks: " + e.getMessage());
//        }
//    }

    @GetMapping
    public List<TaskDTO> getAllTasks() {
        List<Tasks> tasks = tasksRepository.findAll();
            logger.info("Fetched {} tasks", tasks.size());
        return tasks.stream()
                .map(tasksService::convertToDTO)
                .collect(Collectors.toList());
    }


    @PostMapping
    public ResponseEntity<Tasks> createTask(@RequestBody Tasks task, @RequestParam String driverCIN) {
        Tasks createdTask = tasksService.createTask(task, driverCIN);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tasks> getTask(@PathVariable int id) {
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
    public ResponseEntity<Tasks> updateTask(@PathVariable int id, @RequestBody Tasks task) {
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
    @GetMapping("/available")
    public ResponseEntity<List<Tasks>> getAvailableTasks() {
        List<Tasks> tasks = tasksService.getAvailableTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping("/{taskId}/assign")
    public ResponseEntity<Tasks> assignTaskToDriver(@PathVariable Long taskId, @RequestParam String driverCIN) {
        Tasks assignedTask = tasksService.assignTaskToDriver(taskId, driverCIN);
        return new ResponseEntity<>(assignedTask, HttpStatus.OK);
    }

    @PostMapping("/{taskId}/complete")
    public ResponseEntity<Tasks> completeTask(@PathVariable Long taskId) {
        Tasks completedTask = tasksService.completeTask(taskId);
        return new ResponseEntity<>(completedTask, HttpStatus.OK);
    }

    @GetMapping("/in-progress")
    public ResponseEntity<List<Tasks>> getTasksInProgress() {
        List<Tasks> tasks = tasksService.getTasksInProgress();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<Tasks>> getCompletedTasks() {
        List<Tasks> tasks = tasksService.getCompletedTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}
