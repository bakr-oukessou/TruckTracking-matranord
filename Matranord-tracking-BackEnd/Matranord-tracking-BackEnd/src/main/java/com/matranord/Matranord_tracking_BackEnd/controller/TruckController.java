package com.matranord.Matranord_tracking_BackEnd.controller;

import com.matranord.Matranord_tracking_BackEnd.model.Truck;
import com.matranord.Matranord_tracking_BackEnd.services.TruckService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trucks")
public class TruckController {

    @Autowired
    private TruckService truckService;

    private static final Logger logger = LoggerFactory.getLogger(TruckController.class);
    @GetMapping
    public ResponseEntity<?> getAllTrucks() {
        try {
            logger.info("Fetching all trucks");
            List<Truck> trucks = truckService.getAllTrucks();
            logger.info("Fetched {} trucks", trucks.size());
            return ResponseEntity.ok(trucks);
        } catch (Exception e) {
            logger.error("Error fetching trucks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching trucks: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Truck getTruckById(@PathVariable Long id) {
        return truckService.getTruckById(id);
    }

    @PostMapping()
    public Truck createTruck(@RequestBody Truck truck) {
        return truckService.saveTruck(truck);
    }

    @PutMapping("/{id}")
    public Truck updateTruck(@PathVariable Long id, @RequestBody Truck truckDetails) {
        Truck truck = truckService.getTruckById(id);
        // Update truck properties
        return truckService.saveTruck(truck);
    }

    @DeleteMapping("/{id}")
    public void deleteTruck(@PathVariable Long id) {
        truckService.deleteTruck(id);
    }

    //******************Firebase methods******************
//    @PutMapping("/{id}")
//    public void updateTruck(@PathVariable String id, @RequestBody Map<String, Object> updates) {
//        truckService.updateTruck(id, updates);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteTruck(@PathVariable String id) {
//        truckService.deleteTruck(id);
//    }
}