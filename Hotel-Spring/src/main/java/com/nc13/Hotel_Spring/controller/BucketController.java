package com.nc13.Hotel_Spring.controller;

import com.nc13.Hotel_Spring.Model.BucketDTO;
import com.nc13.Hotel_Spring.Model.HotelDTO;
import com.nc13.Hotel_Spring.Model.UserDTO;
import com.nc13.Hotel_Spring.service.BucketService;
import com.nc13.Hotel_Spring.service.HotelService;
import com.nc13.Hotel_Spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // CORS 설정 추가
@RequestMapping("/user/")
public class BucketController {
    @Autowired
    private HotelService hotelService;
    @Autowired
    private BucketService bucketService;
    @Autowired
    private UserService userService;

    @GetMapping("{userid}") // UserInfo
    public UserDTO selectUserById(@PathVariable int userid){
        UserDTO user = userService.selectOneByID(userid);
        System.out.println(user.toString());
        return user;
    }
    @GetMapping("myhotel/{sellerId}")//내 호텔 관리
    public List<HotelDTO> myHotels(@PathVariable int sellerId){
        List<HotelDTO> myhotels = hotelService.selectMyHotels(sellerId);
        for(HotelDTO h : myhotels){
            System.out.println(sellerId+"번 판매자의 호텔: "+h.getSellerId()+"-"+h.getName());
        }
        return myhotels;
    }

    @GetMapping("basket/{userId}") // 장바구니 - 'bucket' INNER JOIN 'hotel' VS bucketId로 hotelId만 & 따로?
    public List<BucketDTO> myBasket(@PathVariable int userId){
        System.out.println("MyBucket");
        List<BucketDTO> newList = bucketService.bucketByUserId(userId);
        for(BucketDTO b : newList){
            System.out.println("newBucketDTO: "+b.toString());
        }
        return newList;
    }

    @GetMapping("basketChecked/{userId}")
    public List<BucketDTO> myBasketChecked(@PathVariable int userId){
        System.out.println("CheckedinMyBucket");
        List<BucketDTO> newList = bucketService.bucketCheckedByUserId(userId);
        for(BucketDTO b : newList){
            System.out.println("newBucketDTO: "+b.toString());
        }
        return newList;
    }//bucketCheckedByUserId

    @DeleteMapping("basket/{bucketId}")
    public ResponseEntity<Void> deleteBasketItem(@PathVariable int bucketId) {
        boolean isDeleted = bucketService.deleteBucketById(bucketId);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // 204 No Content 응답
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found 응답
        }
    }
    
    @PutMapping("book/{id}")
    public HashMap<String, Object> bookHotel(@PathVariable int id) {
        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            BucketDTO bucketDTO = bucketService.selectOne(id);
            int hotelId = bucketDTO.getHotelId();
            hotelService.updateBooked(hotelId);
            resultMap.put("result", "success");
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
        }
        return resultMap;
}
}