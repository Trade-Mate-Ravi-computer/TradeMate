package com.trademate.project.Service;

import com.trademate.project.Model.StockItemModel;
import com.trademate.project.Repository.StockItemRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockItemService {
    @Autowired
    private StockItemRepository stockItemRepository;

    public ResponseEntity<StockItemModel> addStock(StockItemModel item){
        item.getUser().setId(item.getUsersId());
        return new ResponseEntity<StockItemModel>(stockItemRepository.save(item), HttpStatus.CREATED);
    }
    public List<StockItemModel> getAll(){
        return stockItemRepository.findAll();
    }
    public StockItemModel getByName(StockItemModel item){
        return stockItemRepository.findByItemName(item.getItemName());
    }
    public String updateItem(int price,String itemName ){
        StockItemModel existingItem = stockItemRepository.findByItemName(itemName);
        existingItem.setPurchasePrice(price);
        stockItemRepository.save(existingItem);
        return "Updated";
    }
}
