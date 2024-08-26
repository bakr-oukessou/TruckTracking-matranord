package com.matranord.Matranord_tracking_BackEnd.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "details",nullable = false)
    private String details;

    @Column(name = "provider",nullable = false)
    private String provider;

    @Column(name = "Observation",nullable = false)
    private String Observation;

    @Column(name = "Cloture",nullable = false)
    private LocalDateTime Cloture;

    @Column(name = "Dateheurecreation",nullable = false)
    private String Dateheurecreation;

    @Column(name = "assigned_at",nullable = false)
    private String assignedAt;

    @Column(name = "started_at",nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "completed_at",nullable = false)
    private LocalDateTime completedAt;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    @JsonBackReference
    private Driver driver;

    public enum TaskStatus {
        AVAILABLE, IN_PROGRESS, COMPLETED
    }

    public void startTask(Driver driver) {
        this.driver = driver;
        this.status = TaskStatus.IN_PROGRESS;
        this.startedAt = LocalDateTime.now();
    }

    public void completeTask() {
        this.status = TaskStatus.COMPLETED;
        this.completedAt = LocalDateTime.now();
    }

    public Tasks(){

    }

    public Tasks(String details, String provider, String observation, LocalDateTime cloture, String dateHeureCreation, LocalDateTime startedAt, LocalDateTime completedAt, TaskStatus status, Driver driver) {
        this.details = details;
        this.provider = provider;
        Observation = observation;
        Cloture = cloture;
        Dateheurecreation = dateHeureCreation;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.status = status;
        this.driver = driver;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getId() {
        return id;
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

    public String getDateHeureCreation() {
        return Dateheurecreation;
    }

    public void setDateHeureCreation(String dateHeureCreation) {
        Dateheurecreation = dateHeureCreation;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }
}
