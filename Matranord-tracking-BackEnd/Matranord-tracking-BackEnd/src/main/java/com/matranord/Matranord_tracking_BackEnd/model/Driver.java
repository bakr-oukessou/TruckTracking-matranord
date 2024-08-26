package com.matranord.Matranord_tracking_BackEnd.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Chauffeur")
public class Driver {
    @Id
    @Column(name = "Idchauffeur",nullable = false)
    private int id;

    @Column(name = "Nomchauffeur",nullable = false)
    private String Nom;

    @Column(name = "CIN",nullable = false)
    private String CIN;

    @Column(name = "Tel1",nullable = false)
    private String MobileNumber;

    @Column(name = "Email",nullable = false)
    private String email;

    @Column(name = "Adresse",nullable = false)
    private String adresse;

    @Column(name = "Datefinvalidite",nullable = false)
    private Date validitePermit;

    @Column(name = "Idvehicule",nullable = false)
    private int IdVehicule;

    @Column(name="experience",nullable = true)
    private String experience;

    @Lob
    @Column(name = "profile_picture", columnDefinition="LONGBLOB")
    private byte[] profilePicture;

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tasks> tasks = new ArrayList<>();

    public Driver() {
    }

    public Driver(String nom, String CIN, String mobileNumber, String email, String adresse, Date validitePermit, int idVehicule, String experience) {
        Nom = nom;
        this.CIN = CIN;
        MobileNumber = mobileNumber;
        this.email = email;
        this.adresse = adresse;
        this.validitePermit = validitePermit;
        IdVehicule = idVehicule;
        this.experience = experience;
    }

    public String getNom() {
        return Nom;
    }

    public void setNom(String nom) {
        Nom = nom;
    }

    public String getCIN() {
        return CIN;
    }

    public void setCIN(String CIN) {
        this.CIN = CIN;
    }

    public String getMobileNumber() {
        return MobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        MobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Date getValiditePermit() {
        return validitePermit;
    }

    public void setValiditePermit(Date validitePermit) {
        this.validitePermit = validitePermit;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public int getIdVehicule() {
        return IdVehicule;
    }

    public void setIdVehicule(int idVehicule) {
        IdVehicule = idVehicule;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    //////////////////////////////////
    public List<Tasks> getTasks() {
        return tasks;
    }

    public void setTasks(List<Tasks> tasks) {
        this.tasks = tasks;
    }

    public void addTask(Tasks task) {
        tasks.add(task);
        task.setDriver(this);
    }

    public void removeTask(Tasks task) {
        tasks.remove(task);
        task.setDriver(null);
    }
}
