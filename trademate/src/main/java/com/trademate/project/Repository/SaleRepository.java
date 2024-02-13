package com.trademate.project.Repository;

import com.trademate.project.Model.SaleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface SaleRepository extends JpaRepository<SaleModel, Long> {
    List<SaleModel> findByCustomerName(String customerName);
   @Query("select sum(s.profit) as sumOfProfit,sum(s.remaining) as sumOfRemaining,sum(s.totalAmmount) as sumOfTotalAmmount from SaleModel s where month(s.date)=?1 and year(s.date)=?2")
   Map<String,Integer> sumOfRemainingByMonth(int month,int year);
    @Query("select sum(s.profit) as sumOfProfit,sum(s.remaining) as sumOfRemaining,sum(s.totalAmmount) as sumOfTotalAmmount from SaleModel s where year(s.date)=?1")
    Map<String,Integer> sumOfRemainingByYear(int year);

   @Query("Select sum(s.remaining) from SaleModel s where customerName = ?1")
   int sumOfTotalRemainingByCustomer(String customerName);
   @Query("select s from SaleModel s where remaining>0")
    List<SaleModel> salesWithRemainingBalance();
    @Query("select sum(s.profit) as sumOfProfit,sum(s.remaining) as sumOfRemaining,sum(s.totalAmmount) as sumOfTotalAmmount from SaleModel s")
    Map<String,Integer> sumOfTotalRemaining();

}
