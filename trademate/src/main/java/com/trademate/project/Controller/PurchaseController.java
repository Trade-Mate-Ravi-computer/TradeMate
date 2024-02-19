package com.trademate.project.Controller;

import com.trademate.project.Model.PurchaseModel;
import com.trademate.project.Model.StockItemModel;
import com.trademate.project.Service.CompanyService;
import com.trademate.project.Service.PurchaseService;
import com.trademate.project.Service.StockItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/purchase")
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;
@Autowired
private CompanyService companyService;
@Autowired
private StockItemService stockItemService;
    @PostMapping("/add")
    public ResponseEntity<PurchaseModel> addPurchase(@RequestBody PurchaseModel purchase){
        stockItemService.updateItem(purchase.getPrice(),purchase.getItemName());
        purchase.setTotalAmmount(purchase.getPrice()*purchase.getQuantity());
        purchase.setRemaining((purchase.getPrice()*purchase.getQuantity())-purchase.getPaidAmmount());
        purchase.getCompany().setCompanyId(companyService.getByName(purchase.getCompanyName()).getCompanyId());
        purchase.getItem().setItemName(purchase.getItemName());
        return purchaseService.addPurchase(purchase);
    }
    @PostMapping("/getbycompany")
    public List<PurchaseModel> getByCompany(@RequestBody PurchaseModel purchase){
        return purchaseService.getByCompanyName(purchase.getCompanyName());
    }
}
