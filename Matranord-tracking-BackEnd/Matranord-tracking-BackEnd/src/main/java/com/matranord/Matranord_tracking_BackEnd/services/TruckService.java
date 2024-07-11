package com.matranord.Matranord_tracking_BackEnd.services;
import com.google.firebase.database.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.matranord.Matranord_tracking_BackEnd.model.Truck;
import com.matranord.Matranord_tracking_BackEnd.repository.TruckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

@Service
public class TruckService {
    @Autowired
    private TruckRepository truckRepository;
    private final DatabaseReference databaseReference;



    public List<Truck> getAllTrucks() {
        return truckRepository.findAll();
    }

    public Truck getTruckById(Long id) {
        return truckRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Truck not found"));    }

    public Truck saveTruck(Truck truck) {
        return truckRepository.save(truck);
    }

    public void deleteTruck(Long id) {
        truckRepository.deleteById(id);
    }


    // **************Firebase Methods***********
    public TruckService() {
        this.databaseReference = FirebaseDatabase.getInstance().getReference("trucks");
    }

    public void addTruck(Truck truck) {
        databaseReference.push().setValueAsync(truck);
    }
    public List<Truck> getTrucks() throws InterruptedException {
        List<Truck> trucks = new ArrayList<>();
        CountDownLatch latch = new CountDownLatch(1);

        databaseReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    Truck truck = snapshot.getValue(Truck.class);
                    trucks.add(truck);
                }
                latch.countDown();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                latch.countDown();
            }
        });

        latch.await();
        return trucks;
    }

    public void updateTruck(String id, Map<String, Object> updates) {
        databaseReference.child(id).updateChildrenAsync(updates);
    }


    public void deleteTruck(String id) {
        databaseReference.child(id).removeValueAsync();
    }

}