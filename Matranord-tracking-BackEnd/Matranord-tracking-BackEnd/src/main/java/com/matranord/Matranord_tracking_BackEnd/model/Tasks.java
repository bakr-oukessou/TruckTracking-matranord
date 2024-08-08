package com.matranord.Matranord_tracking_BackEnd.model;

public class Tasks {
    private int id;
    private String details;
    private String provider;

    public Tasks(String details, String provider) {
        this.details = details;
        this.provider = provider;
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
}
