package com.matranord.Matranord_tracking_BackEnd.repository;

import com.matranord.Matranord_tracking_BackEnd.model.Driver;
import com.matranord.Matranord_tracking_BackEnd.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {
    List<Tasks> findByDriver(Driver driver);
    List<Tasks> findByDriverCIN(String driverCIN);
    List<Tasks> findByStatus(Tasks.TaskStatus status);
}
