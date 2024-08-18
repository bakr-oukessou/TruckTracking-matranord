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
    public List<Tasks> getAvailableTasks() {
        return tasksRepository.findByStatus(Tasks.TaskStatus.AVAILABLE);
    }

    public Tasks assignTaskToDriver(Long taskId, String driverCIN) {
        Optional<Tasks> taskOpt = tasksRepository.findById(taskId);
        Optional<Driver> driverOpt = driverRepository.findByCIN(driverCIN);

        if (taskOpt.isPresent() && driverOpt.isPresent()) {
            Tasks task = taskOpt.get();
            Driver driver = driverOpt.get();

            if (task.getStatus() == Tasks.TaskStatus.AVAILABLE) {
                task.startTask(driver);
                return tasksRepository.save(task);
            } else {
                throw new RuntimeException("Tasks is not available");
            }
        }
        throw new RuntimeException("Task or Driver not found");
    }

    public Tasks completeTask(Long taskId) {
        Optional<Tasks> taskOpt = tasksRepository.findById(taskId);

        if (taskOpt.isPresent()) {
            Tasks task = taskOpt.get();
            if (task.getStatus() == Tasks.TaskStatus.IN_PROGRESS) {
                task.completeTask();
                return tasksRepository.save(task);
            } else {
                throw new RuntimeException("Task is not in progress");
            }
        }
        throw new RuntimeException("Task not found");
    }

    public List<Tasks> getTasksInProgress() {
        return tasksRepository.findByStatus(Tasks.TaskStatus.IN_PROGRESS);
    }

    public List<Tasks> getCompletedTasks() {
        return tasksRepository.findByStatus(Tasks.TaskStatus.COMPLETED);
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
