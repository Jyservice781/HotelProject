package com.nc13.Hotel_Spring.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyDTO {
    private int id;
    private int customerId;
    private int hotelId;
    private String hotelname;
    private Double price;
}
