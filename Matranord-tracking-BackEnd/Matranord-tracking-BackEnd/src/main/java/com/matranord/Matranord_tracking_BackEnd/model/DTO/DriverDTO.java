package com.matranord.Matranord_tracking_BackEnd.model.DTO;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.matranord.Matranord_tracking_BackEnd.model.Tasks;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class DriverDTO {
    private int id;
    private String Nom;
    private String CIN;
    private String MobileNumber;
    private String email;
    private String adresse;
    private Date validitePermit;
    private int IdVehicule;
    private String experience;
    private List<TaskDTO> tasks ;

    private byte[] profilePictureBase64;

    public DriverDTO(){}
    public DriverDTO(byte[] profilePictureBase64, String experience, int idVehicule, Date validitePermit, String email, String adresse, String mobileNumber, String CIN, String nom, int id) {
        this.profilePictureBase64 = profilePictureBase64;
        this.experience = experience;
        IdVehicule = idVehicule;
        this.validitePermit = validitePermit;
        this.email = email;
        this.adresse = adresse;
        MobileNumber = mobileNumber;
        this.CIN = CIN;
        Nom = nom;
        this.id = id;
    }

    public byte[] getProfilePictureBase64() {
        return profilePictureBase64;
    }

    public void setProfilePictureBase64(byte[] profilePictureBase64) {
        this.profilePictureBase64 = profilePictureBase64;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
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

    public Date getValiditePermit() {
        return validitePermit;
    }

    public void setValiditePermit(Date validitePermit) {
        this.validitePermit = validitePermit;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return MobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        MobileNumber = mobileNumber;
    }

    public String getCIN() {
        return CIN;
    }

    public void setCIN(String CIN) {
        this.CIN = CIN;
    }

    public String getNom() {
        return Nom;
    }

    public void setNom(String nom) {
        Nom = nom;
    }
}
