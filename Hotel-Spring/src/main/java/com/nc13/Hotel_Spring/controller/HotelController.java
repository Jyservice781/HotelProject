package com.nc13.Hotel_Spring.controller;

import com.nc13.Hotel_Spring.Model.HotelDTO;
import com.nc13.Hotel_Spring.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/hotel/")
public class HotelController {
    private HotelService HOTEL_SERVICE;
    @Autowired
    public HotelController(HotelService hotelService) {//생성자 주입 방식
        HOTEL_SERVICE = hotelService;
    }
    @GetMapping("showOne/{id}")
    public HotelDTO showOne(@PathVariable int id){
        HotelDTO oneHotel = HOTEL_SERVICE.selectOne(id);
        return oneHotel;
    }
    @GetMapping("showList/{pageNo}")
    public HashMap<String, Object> showAll(@PathVariable int pageNo, Model model, @RequestParam(value="searchType",required = false) String searchType,
                                           @RequestParam(value="keyword",required = false) String keyword){

        HashMap<String, Object> resultMap = new HashMap<>();

        int maxPage = HOTEL_SERVICE.selectMaxPage();

        int startPage = 1;
        int endPage = 1;

        if (maxPage < 5) {
            endPage = maxPage;
        } else if (pageNo <= 3) {
            endPage = 5;
        } else if (pageNo >= maxPage - 2) {
            startPage = maxPage - 4;
            endPage = maxPage;
        } else {
            startPage = pageNo - 2;
            endPage = pageNo + 2;
        }

        resultMap.put("currentPage", pageNo);
        resultMap.put("startPage", startPage);
        resultMap.put("endPage", endPage);
        resultMap.put("maxPage", maxPage);
        resultMap.put("hotelList", HOTEL_SERVICE.selectAll(pageNo));

        List<HotelDTO> list;
        if(searchType != null & keyword != null && !keyword.isEmpty()){
            list = HOTEL_SERVICE.searchHotels(searchType,keyword);
            model.addAttribute("searchType",searchType);
            model.addAttribute("keyword",keyword);
        }else{
            list = HOTEL_SERVICE.selectAll(pageNo);
        }
        model.addAttribute("list",list);

        return resultMap;
    }
    @DeleteMapping("delete/{hotelId}")
    public ResponseEntity<Void> deleteBasketItem(@PathVariable int hotelId) {
        // 장바구니에서 userId와 productId에 해당하는 항목을 삭제하는 로직
        boolean isDeleted = HOTEL_SERVICE.deleteHotelById(hotelId);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // 204 No Content 응답
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found 응답
        }
    }
}
