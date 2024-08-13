package com.nc13.Hotel_Spring.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;
@Service
public class BucketService {
    public SqlSession SESSION;
    private final String NAMESPACE = "mapper.BucketMapper";
    @Autowired
    public BucketService(SqlSession session) {
        SESSION = session;
    }
    public boolean deleteItemFromBucket(int userId, int productId) {
        int result = SESSION.delete(NAMESPACE + ".deleteOne", Map.of("userId", userId, "productId", productId));
        return result > 0;
    }

}
