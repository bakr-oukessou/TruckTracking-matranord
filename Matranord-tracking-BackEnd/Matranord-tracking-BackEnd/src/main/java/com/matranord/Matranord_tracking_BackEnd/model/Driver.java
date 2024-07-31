package com.matranord.Matranord_tracking_BackEnd.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "Chauffeur")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "NomChauffeur",nullable = false)
    private String Nom;

    @Column(name = "CIN",nullable = false)
    private String CIN;

    @Column(name = "Tel1",nullable = false)
    private int MobileNumber;

    @Column(name = "Email",nullable = false)
    private String email;

    @Column(name = "Adresse",nullable = false)
    private String adresse;

    @Column(name = "DateFinValidite",nullable = false)
    private Date validitePermit;

    @Column(name = "IdVehicule",nullable = false)
    private int IdVehicule;

    private String experience;

    public Driver() {
    }

    public Driver(String nom, String CIN, int mobileNumber, String email, String adresse, Date validitePermit, int idVehicule, String experience) {
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
}
