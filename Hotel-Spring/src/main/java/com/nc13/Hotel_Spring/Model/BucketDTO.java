package com.nc13.Hotel_Spring.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BucketDTO {
    private int id;
    private int customerID;
    private boolean payment;
    private int hotelId;
    private String hotelName;
    private Date startEntry;
    private Date endEntry;
    private Double price;
    private boolean booked;

    //private HotelDTO hotelinbucket;//이러면 안되나? //불필요하게 복잡 & 보안에 안좋음
}
