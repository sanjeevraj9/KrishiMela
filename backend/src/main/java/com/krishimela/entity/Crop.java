package com.krishimela.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "crops")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;        // e.g. Wheat, Rice
    private double pricePerKg;
    private double quantity;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private User farmer;
}
