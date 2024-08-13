package com.nc13.Hotel_Spring.controller;

import com.nc13.Hotel_Spring.Model.HotelDTO;
import com.nc13.Hotel_Spring.service.BucketService;
import com.nc13.Hotel_Spring.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user/basket")
public class BucketController {
    @Autowired
    private HotelService hotelService;

    @Autowired
    private BucketService bucketService;
    @GetMapping("{userId}")
    public List<HotelDTO> pickBasketByuserId(@PathVariable int userId){
        //hotelinMyBasket
        System.out.println("hotelinMyBucket");
        List<HotelDTO> hotelinMyBucket = hotelService.selectAllHotelInBasketByUserID(userId);
        System.out.printf("%d번 고객님의 장바구니 호텔 목록\n",userId);
        for(HotelDTO h : hotelinMyBucket){
            System.out.println(h.toString());
        }
        return hotelinMyBucket;
    }
    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<Void> deleteBasketItem(@PathVariable int userId, @PathVariable int productId) {
        System.out.println("userId: "+userId);
        System.out.println("productId: "+productId); //이거 hotelDTO 아이디임. 애초에 내가 basketDTO로 가져오지 않았음
        // 장바구니에서 userId와 productId에 해당하는 항목을 삭제하는 로직
        boolean isDeleted = bucketService.deleteItemFromBucket(userId, productId);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // 204 No Content 응답
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found 응답
        }
    }
}
