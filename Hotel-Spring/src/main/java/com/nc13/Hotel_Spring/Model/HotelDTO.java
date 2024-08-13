package com.nc13.Hotel_Spring.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelDTO {
    public int id;
    public String name;
    public String address;
    public Date startEntry;
    public Date endEntry;
    public int roomNumber;
    public boolean booked;
    public double price;
    public int sellerId;
    public String content;
    public String shortContent;
    public int roomMember;
    public String nickname;
    private String imagePath;
    private String thumbnail;
}
