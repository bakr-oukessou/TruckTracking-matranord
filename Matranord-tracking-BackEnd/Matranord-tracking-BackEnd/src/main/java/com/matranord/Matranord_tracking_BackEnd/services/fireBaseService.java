package com.matranord.Matranord_tracking_BackEnd.services;

import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class fireBaseService {

    private final FirebaseApp firebaseApp;

    @Autowired
    public fireBaseService(FirebaseApp firebaseApp) {
        this.firebaseApp = firebaseApp;
    }

    public void writeToRealtimeDatabase(String path, Object data) {
        DatabaseReference databaseReference = FirebaseDatabase.getInstance(firebaseApp).getReference(path);
        databaseReference.setValueAsync(data);
    }

    public Object readFromRealtimeDatabase(String path) {
        DatabaseReference databaseReference = FirebaseDatabase.getInstance(firebaseApp).getReference(path);
        return databaseReference.getValue();
    }
}
