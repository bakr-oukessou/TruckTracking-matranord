package com.matranord.Matranord_tracking_BackEnd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Truck{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date;
    private String matricule;
    private String numeroDeDossier;
    private String trajet;
    private String chargement;
    private String dechargement;
    private String status;

    public Truck(String status, String dechargement, String chargement, String trajet, String numeroDeDossier, String matricule, Date date, int id) {
        this.status = status;
        this.dechargement = dechargement;
        this.chargement = chargement;
        this.trajet = trajet;
        this.numeroDeDossier = numeroDeDossier;
        this.matricule = matricule;
        this.date = date;
        this.id = id;
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

    public String getNumeroDeDossier() {
        return numeroDeDossier;
    }

    public void setNumeroDeDossier(String numeroDeDossier) {
        this.numeroDeDossier = numeroDeDossier;
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
}