package com.matranord.Matranord_tracking_BackEnd.model;

public class Tasks {
    private String id;
    private String details;
    private String provider;
    private String Observation;
    private String Commentaire;
    private String Cloture;
    private String DateHeureCreation;

    public Tasks(){

    }

    public Tasks(String details, String provider, String observation, String commentaire, String cloture, String dateHeureCreation, String id) {
        this.details = details;
        this.provider = provider;
        Observation = observation;
        Commentaire = commentaire;
        Cloture = cloture;
        DateHeureCreation = dateHeureCreation;
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

    public String getCloture() {
        return Cloture;
    }

    public void setCloture(String cloture) {
        Cloture = cloture;
    }

    public String getDateHeureCreation() {
        return DateHeureCreation;
    }

    public void setDateHeureCreation(String dateHeureCreation) {
        DateHeureCreation = dateHeureCreation;
    }
}
