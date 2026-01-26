package com.krishimela.repository;

import com.krishimela.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByNameContainingIgnoreCase(String name);
}
