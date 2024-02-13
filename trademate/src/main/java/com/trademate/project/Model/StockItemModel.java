package com.trademate.project.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "StockItems")
public class StockItemModel {
    @Id
    @Column(unique = true,nullable = false)
    private String itemName;
    private int purchasePrice;
    private String category;
    private long usersId;
    @ManyToOne
    private UserModel user;
}
