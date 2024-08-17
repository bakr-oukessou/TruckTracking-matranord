package com.matranord.Matranord_tracking_BackEnd.services;

import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.model.Tasks;
import com.matranord.Matranord_tracking_BackEnd.repository.DriverRepository;
import com.matranord.Matranord_tracking_BackEnd.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TasksService {
    private final TasksRepository tasksRepository;
    private final DriverRepository driverRepository;

    public Tasks createTask(Tasks task, String driverCIN) {
        Optional<Driver> driver = driverRepository.findByCIN(driverCIN);
        if (driver.isPresent()) {
            task.setDriver(driver.get());
            return tasksRepository.save(task);
        }
        throw new RuntimeException("Driver not found");
    }

    @Autowired
    public TasksService(TasksRepository tasksRepository, DriverRepository driverRepository) {
        this.tasksRepository = tasksRepository;
        this.driverRepository = driverRepository;
    }

    public List<Tasks> getTasksByDriverCIN(String driverCIN) {
        return tasksRepository.findByDriverCIN(driverCIN);
    }

    public Tasks createTasks(Tasks task) {
        return tasksRepository.save(task);
    }

    public Optional<Tasks> getTasksById(String id) {
        return tasksRepository.findById(Long.valueOf(id));
    }

    public Tasks updateTasks(Tasks task) {
        return tasksRepository.save(task);
    }

    public void deleteTasks(String id) {
        tasksRepository.deleteById(Long.valueOf(id));
    }

    public List<Tasks> getAllTasks() {
        return tasksRepository.findAll();
    }
}
