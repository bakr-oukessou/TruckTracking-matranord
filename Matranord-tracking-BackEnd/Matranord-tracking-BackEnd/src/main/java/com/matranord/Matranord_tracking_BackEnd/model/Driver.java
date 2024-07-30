package com.matranord.Matranord_tracking_BackEnd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Chauffeur")
public class Driver {
    private int id;
    private String Nom;
    private String CIN;
    private int MobileNumber;
    private String email;
    private String adresse;
    private String validitePermit;
    private int IdVehicule;
    private String experience;

    public Driver() {
    }

    public Driver(String nom, String CIN, int mobileNumber, String email, String adresse, String validitePermit, int idVehicule, String experience) {
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

    public int getMobileNumber() {
        return MobileNumber;
    }

    public void setMobileNumber(int mobileNumber) {
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

    public String getValiditePermit() {
        return validitePermit;
    }

    public void setValiditePermit(String validitePermit) {
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
}
