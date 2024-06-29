package com.matranord.Matranord_tracking_BackEnd.model;

import jakarta.persistence.*;

import java.sql.Date;


@Entity
@Table(name = "Truck")
public class Truck{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "matricule",nullable = false)
    private String matricule;

    @Column(name = "date",nullable = false)
    private Date date;

    @Column(name = "numero_dossier",nullable = false)
    private String numero_dossier;

    @Column(name = "trajet",nullable = false)
    private String trajet;

    @Column(name = "chargement",nullable = false)
    private String chargement;

    @Column(name = "dechargement",nullable = false)
    private String dechargement;

    @Column(name = "status",nullable = false)
    private String status;

    @Column(name = "longitude")
    private String longitude ;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "positionnement")
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

    public Truck(String matricule, Date date, String numeroDossier, String trajet, String dechargement, String chargement, String status, String longitude, String latitude, String positionnement) {
        this.date = date;
        this.matricule = matricule;
        this.numero_dossier = numeroDossier;
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
        return numero_dossier;
    }

    public void setNumeroDossier(String numeroDossier) {
        this.numero_dossier = numeroDossier;
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