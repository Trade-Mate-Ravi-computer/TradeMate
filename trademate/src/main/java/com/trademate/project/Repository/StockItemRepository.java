package com.trademate.project.Repository;

import com.trademate.project.Model.StockItemModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockItemRepository extends JpaRepository<StockItemModel,String> {
    public StockItemModel findByItemName(String itemName);
}
