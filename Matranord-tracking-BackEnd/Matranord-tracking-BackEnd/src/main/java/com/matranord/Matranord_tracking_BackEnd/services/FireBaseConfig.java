package com.matranord.Matranord_tracking_BackEnd.services;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;

import java.io.FileInputStream;
import java.io.IOException;

public class FireBaseConfig {
    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("C:/Users/STAGIAIRE/Desktop/Projet matranord/Matranord-tracking-BackEnd/Matranord-tracking-BackEnd/src/main/java/com/matranord/Matranord_tracking_BackEnd/services/security/trucktracking-fa6fc-firebase-adminsdk-vtqy8-d9935e8e2c.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://console.firebase.google.com/project/trucktracking-fa6fc/database/trucktracking-fa6fc-default-rtdb/data/~2F")
                .build();

        return FirebaseApp.initializeApp(options);
    }
}
