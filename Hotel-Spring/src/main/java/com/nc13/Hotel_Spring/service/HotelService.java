package com.nc13.Hotel_Spring.service;

import com.nc13.Hotel_Spring.Model.HotelDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class HotelService {
    public SqlSession SESSION;
    private final String NAMESPACE = "mapper.HotelMapper";
    private final int PAGE_SIZE = 20;
    @Autowired
    public HotelService(SqlSession session) { //생성자 주입
        SESSION = session;
    }

    public HotelDTO selectOne(int hotelid){
        return SESSION.selectOne(NAMESPACE+".selectOne", hotelid);
    }
    public List<HotelDTO> selectAll(int pageNo){
        HashMap<String, Integer> paramMap = new HashMap<>();
        paramMap.put("startRow", (pageNo - 1) * PAGE_SIZE);
        paramMap.put("size", PAGE_SIZE);

        return SESSION.selectList(NAMESPACE+".selectAll");
    }
    public int selectMaxPage(){ //max page
        int maxRow = SESSION.selectOne(NAMESPACE + ".selectMaxPage");
        int maxPage = maxRow / PAGE_SIZE;
        maxPage = (maxRow % PAGE_SIZE == 0) ? maxPage : maxPage + 1;
        return maxPage;
    }
    public void insert(HotelDTO hotelDTO) {
        SESSION.insert(NAMESPACE + ".insert", hotelDTO);
    }

    public void update(HotelDTO hotelDTO) {
        SESSION.update(NAMESPACE + ".update", hotelDTO);
    }

    public void delete(int id) {
        SESSION.delete(NAMESPACE + ".delete", id);
    }
    public List<HotelDTO> searchHotels(String searchType, String keyword){
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("searchType",searchType);
        paramMap.put("keyword",keyword);
        paramMap.put("startRow",0);
        paramMap.put("size",PAGE_SIZE);

        return SESSION.selectList(NAMESPACE+".searchBoards",paramMap);

    }

    public List<HotelDTO> selectAllHotelInBasketByUserID(int userId){
        return SESSION.selectList(NAMESPACE+".hotelInBucket",userId);
    }
}
