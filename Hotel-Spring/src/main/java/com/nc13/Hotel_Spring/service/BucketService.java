package com.nc13.Hotel_Spring.service;

import com.nc13.Hotel_Spring.Model.BucketDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class BucketService {
    public SqlSession SESSION;
    private final String NAMESPACE = "mapper.BucketMapper";
    @Autowired
    public BucketService(SqlSession session) {
        SESSION = session;
    }

    //장바구니 (userId로 조회)
    public List<BucketDTO> bucketByUserId(int bucketId){
        return SESSION.selectList(NAMESPACE+".bucketByUserId",bucketId);
        //booked 0인 것들만 갖고오도록 했다가 -> 개선 방안 생각남 -> 1인 것들도 갖고왔다가 나중에 프론트단에서 블러처리? ->안되면 where 절에 booked = 0 추가하겠음
    }
    //장바구니 - 결제완료 (userId로 조회)
    public List<BucketDTO> bucketCheckedByUserId(int bucketId){
        return SESSION.selectList(NAMESPACE+".bucketCheckedByUserId",bucketId);
    }
    //삭제할 때는 basketId로 삭제해야함
    public boolean deleteBucketById(int bucketId) {
        int result = SESSION.delete(NAMESPACE + ".deleteOne",bucketId);
        return result > 0; //삭제 성공 시 1 반환
    }

}
