package com.matranord.Matranord_tracking_BackEnd.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(nullable = true)
    private String details;

    @Column(nullable = true)
    private String provider;

    @Column(nullable = true)
    private String Observation;

    @Column(nullable = true)
    private String Commentaire;

    @Column(nullable = true)
    private LocalDateTime Cloture;

    @Column(nullable = true)
    private String DateHeureCreation;

    @Column(nullable = true)
    private LocalDateTime startedAt;

    @Column(nullable = true)
    private LocalDateTime completedAt;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
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

    public Tasks(String details, String provider, String observation, String commentaire, LocalDateTime cloture, String dateHeureCreation, LocalDateTime startedAt, LocalDateTime completedAt, TaskStatus status, Driver driver) {
        this.details = details;
        this.provider = provider;
        Observation = observation;
        Commentaire = commentaire;
        Cloture = cloture;
        DateHeureCreation = dateHeureCreation;
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

    public String getCommentaire() {
        return Commentaire;
    }

    public void setCommentaire(String commentaire) {
        Commentaire = commentaire;
    }

    public LocalDateTime getCloture() {
        return Cloture;
    }

    public void setCloture(LocalDateTime cloture) {
        Cloture = cloture;
    }

    public String getDateHeureCreation() {
        return DateHeureCreation;
    }

    public void setDateHeureCreation(String dateHeureCreation) {
        DateHeureCreation = dateHeureCreation;
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
