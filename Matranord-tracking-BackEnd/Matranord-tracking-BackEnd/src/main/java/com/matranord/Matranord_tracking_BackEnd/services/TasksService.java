package com.matranord.Matranord_tracking_BackEnd.services;

import com.matranord.Matranord_tracking_BackEnd.model.DTO.DriverDTO;
import com.matranord.Matranord_tracking_BackEnd.model.DTO.TaskDTO;
import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.model.Tasks;
import com.matranord.Matranord_tracking_BackEnd.repository.DriverRepository;
import com.matranord.Matranord_tracking_BackEnd.repository.TasksRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
                task.setAssignedAt(String.valueOf(LocalDateTime.now()));
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

//    public Tasks createTasks(Tasks task) {
//        return tasksRepository.save(task);
//    }

    @Transactional
    public Tasks createTask(Tasks task) {
        // Validate input
        if (task == null) {
            throw new IllegalArgumentException("Task cannot be null");
        }

        // Set task properties
        task.setStatus(Tasks.TaskStatus.AVAILABLE);
        task.setAssignedAt(null);
        // Ensure DateHeureCreation is set
        if (task.getDateHeureCreation() == null) {
            task.setDateHeureCreation(LocalDateTime.now().toString());
        }

        // Validate other required fields
        if (task.getDetails() == null || task.getDetails().isEmpty()) {
            throw new IllegalArgumentException("Task details are required");
        }
        if (task.getProvider() == null || task.getProvider().isEmpty()) {
            throw new IllegalArgumentException("Provider is required");
        }
        if (task.getObservation() == null || task.getObservation().isEmpty()) {
            throw new IllegalArgumentException("Observation is required");
        }
        if (task.getCloture() == null) {
            throw new IllegalArgumentException("Cloture date is required");
        }

        // Save and return the task
        return tasksRepository.save(task);
    }


    public Optional<Tasks> getTasksById(int id) {
        return tasksRepository.findById(Long.valueOf(id));
    }

    public Tasks updateTasks(Tasks task) {
        return tasksRepository.save(task);
    }

    public void deleteTasks(int id) {
        tasksRepository.deleteById((long) id);
    }

    public List<Tasks> getAllTasks() {
        return tasksRepository.findAll();
    }

    public TaskDTO convertToDTO(Tasks task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(Long.valueOf(task.getId()));
        dto.setDetails(task.getDetails());
        dto.setProvider(task.getProvider());
        dto.setObservation(task.getObservation());
        dto.setCloture(task.getCloture());
        dto.setDateheurecreation(task.getDateHeureCreation());
        dto.setAssignedAt(task.getAssignedAt());
        dto.setStartedAt(task.getStartedAt());
        dto.setCompletedAt(task.getCompletedAt());
        dto.setStatus(task.getStatus());

        if (task.getDriver() != null) {
            DriverDTO driverDTO = new DriverDTO();
            driverDTO.setId(task.getDriver().getId());
            driverDTO.setNom(task.getDriver().getNom());
            driverDTO.setCIN(task.getDriver().getCIN());
            driverDTO.setEmail(task.getDriver().getEmail());
            driverDTO.setMobileNumber(task.getDriver().getMobileNumber());
            driverDTO.setAdresse(task.getDriver().getAdresse());
            driverDTO.setValiditePermit(task.getDriver().getValiditePermit());
            driverDTO.setIdVehicule(task.getDriver().getIdVehicule());
            driverDTO.setExperience(task.getDriver().getExperience());
            dto.setDriver(driverDTO);
        }

        return dto;
    }
}
