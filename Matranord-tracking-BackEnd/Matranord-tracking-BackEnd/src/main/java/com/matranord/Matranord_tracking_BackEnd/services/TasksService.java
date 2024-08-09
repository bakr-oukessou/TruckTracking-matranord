package com.matranord.Matranord_tracking_BackEnd.services;

import com.matranord.Matranord_tracking_BackEnd.model.Tasks;
import com.matranord.Matranord_tracking_BackEnd.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class TasksService {
    private final TasksRepository tasksRepository;

    @Autowired
    public TasksService(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    public Tasks createTasks(Tasks driver) {
        return tasksRepository.save(driver);
    }

    public Optional<Tasks> getTasksByCIN(String id) {
        return tasksRepository.findById(Long.valueOf(id));
    }

    public Tasks updateTasks(Tasks driver) {
        return tasksRepository.save(driver);
    }

    public void deleteTasks(String id) {
        tasksRepository.deleteById(Long.valueOf(id));
    }

    public List<Tasks> getAllTaskss() {
        return tasksRepository.findAll();
    }
}
