package com.matranord.Matranord_tracking_BackEnd.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
//@Table(name = "Truck")
public class Truck{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String matricule;
    private Date date;
    private String numeroDossier;
    private String trajet;
    private String chargement;
    private String dechargement;
    private String status;
    private String longitude ;
    private String latitude;
    private String positionnement;

    public Truck() {
    }

//    public Truck(String matricule, Date date, String numeroDeDossier, String trajet, String dechargement, String chargement, String status, String longitude, String latitude, String positionnement) {
//        this.date = new Date();
//        this.matricule = "";
//        this.numeroDossier = "";
//        this.trajet = "";
//        this.dechargement = "";
//        this.chargement = "";
//        this.longitude = "";
//        this.latitude = "";
//        this.positionnement = "";
//        this.status = "";
//    }

    public Truck(String matricule, Date date, String numeroDeDossier, String trajet, String dechargement, String chargement, String status, String longitude, String latitude, String positionnement) {
        this.date = date;
        this.matricule = matricule;
        this.numeroDossier = numeroDeDossier;
        this.trajet = trajet;
        this.dechargement = dechargement;
        this.chargement = chargement;
        this.longitude = longitude;
        this.latitude = latitude;
        this.positionnement = positionnement;
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getNumeroDossier() {
        return numeroDossier;
    }

    public void setNumeroDossier(String numeroDeDossier) {
        this.numeroDossier = numeroDeDossier;
    }

    public String getTrajet() {
        return trajet;
    }

    public void setTrajet(String trajet) {
        this.trajet = trajet;
    }

    public String getChargement() {
        return chargement;
    }

    public void setChargement(String chargement) {
        this.chargement = chargement;
    }

    public String getDechargement() {
        return dechargement;
    }

    public void setDechargement(String dechargement) {
        this.dechargement = dechargement;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getPositionnement() {
        return positionnement;
    }

    public void setPositionnement(String positionnement) {
        this.positionnement = positionnement;
    }
}