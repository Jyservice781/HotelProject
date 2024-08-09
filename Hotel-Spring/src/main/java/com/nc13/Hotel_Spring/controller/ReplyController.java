package com.nc13.hotel.controller;

import com.nc13.hotel.model.ReplyDTO;
import com.nc13.hotel.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/reply/")
public class ReplyController {
    private ReplyService REPLY_SERVICE;

    @Autowired
    public ReplyController(ReplyService REPLY_SERVICE) {
        this.REPLY_SERVICE = REPLY_SERVICE;
    }

    @GetMapping("selectList/{hotelId}")
    public HashMap<String, Object> showList(@PathVariable int hotelId,
                                            @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "2") int size,
                                            @RequestParam(defaultValue = "latest") String sort) {
        HashMap<String, Object> result = new HashMap<>();

        result.put("replyList", REPLY_SERVICE.selectList(hotelId, page, size, sort));
        result.put("totalCount", REPLY_SERVICE.getTotalCount(hotelId));
        result.put("totalScore", REPLY_SERVICE.getTotalScore(hotelId));
        return result;
    }

    // 수정 화면
    @GetMapping("selectOne/{id}")
    public HashMap<String, Object> showOne(@PathVariable int id) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("replyOne", REPLY_SERVICE.selectOne(id));
        return result;
    }

    // !!! 호텔 기능과 연결 시 파라미터로 hotelId 받아와야함
    @PostMapping("write")
    public ResponseEntity<Map<String, Object>> write(@RequestBody ReplyDTO replyDTO) {
        // 1. 객체 생성
        Map<String, Object> resultMap = new HashMap<>();
        // 테스트를 위해 강제값 1 저장
        replyDTO.setHotelId(1);
        replyDTO.setCustomerId(1);

        REPLY_SERVICE.insert(replyDTO);

        //2. 데이터 저장
        resultMap.put("title", replyDTO.getTitle());
        resultMap.put("content", replyDTO.getContent());
        resultMap.put("score", replyDTO.getScore());

        // 3. 반환
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("update")
    public Map<String, Object> update(@RequestBody ReplyDTO replyDTO) {
        Map<String, Object> resultMap = new HashMap<>();

        // 테스트를 위해 강제값 1 저장
        replyDTO.setHotelId(1);
        replyDTO.setCustomerId(1);

        boolean updateSuccess = REPLY_SERVICE.update(replyDTO);

        if (updateSuccess) {
            resultMap.put("success", true);
            resultMap.put("destId", replyDTO.getHotelId());
            resultMap.put("score", replyDTO.getScore());
            resultMap.put("title", replyDTO.getTitle());
            resultMap.put("content", replyDTO.getContent());
        } else {
            resultMap.put("success", false);
        }

        return resultMap;
    }

    @GetMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        REPLY_SERVICE.delete(id);

        return ResponseEntity.ok().build();
    }
}
