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

@RestController
@RequestMapping("/api/tasks")
public class TasksController {
    @Autowired
    private TasksService tasksService;
    private static final Logger logger = LoggerFactory.getLogger(TruckController.class);
    @GetMapping
    public ResponseEntity<?> getAllTrucks() {
        try {
            logger.info("Fetching all trucks");
            List<Tasks> tasks = tasksService.getAllTaskss();
            logger.info("Fetched {} taskss", tasks.size());
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("Error fetching taskss", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching taskss: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Tasks getTasksById(@PathVariable String id) {
        return tasksService.getTasksByCIN(Long.valueOf(id));
    }

    @PostMapping()
    public Tasks createTasks(@RequestBody Tasks tasks) {
        return tasksService.createTasks(tasks);
    }

    @PutMapping("/{id}")
    public Tasks updateTasks(@PathVariable Long id, @RequestBody Tasks tasksDetails) {
        Tasks tasks = tasksService.getTasksByCIN(Long.valueOf(id));
        // Update tasks properties
        return tasksService.createTasks(tasks);
    }

    @DeleteMapping("/{id}")
    public void deleteTasks(@PathVariable Long id) {
        tasksService.deleteTasks(id);
    }
}
