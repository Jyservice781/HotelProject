package com.nc13.Hotel_Spring.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BucketDTO {
    private int id;
    private int customerID;
    private int hotelId;
    private String hotelName;
    private Double price;
}
