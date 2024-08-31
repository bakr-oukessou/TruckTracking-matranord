package com.matranord.Matranord_tracking_BackEnd.model.DTO;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.model.Tasks;
import jakarta.persistence.*;

import java.time.LocalDateTime;

public class TaskDTO {
    private Long id;
    private String details;
    private String provider;
    private String Observation;
    private LocalDateTime Cloture;
    private String Dateheurecreation;
    private String assignedAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Tasks.TaskStatus status;
    private DriverDTO driver;
    public enum TaskStatus {
        AVAILABLE, IN_PROGRESS, COMPLETED
    }

    public DriverDTO getDriver() {
        return driver;
    }

    public void setDriver(DriverDTO driver) {
        this.driver = driver;
    }


    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getObservation() {
        return Observation;
    }

    public void setObservation(String observation) {
        Observation = observation;
    }

    public LocalDateTime getCloture() {
        return Cloture;
    }

    public void setCloture(LocalDateTime cloture) {
        Cloture = cloture;
    }

    public String getDateheurecreation() {
        return Dateheurecreation;
    }

    public void setDateheurecreation(String dateheurecreation) {
        Dateheurecreation = dateheurecreation;
    }

    public String getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(String assignedAt) {
        this.assignedAt = assignedAt;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public Tasks.TaskStatus getStatus() {
        return status;
    }

    public void setStatus(Tasks.TaskStatus status) {
        this.status = status;
    }
}
