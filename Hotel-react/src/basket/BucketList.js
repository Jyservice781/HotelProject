import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Spinner, Alert, Button } from 'react-bootstrap';

let BucketList = () => {
    let [buckets, setBuckets] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect(() => {
        let fetchBuckets = async () => {
            try {
                let response = await axios.get('http://localhost:8080/hotels/bucketList');
                setBuckets(response.data); // 서버에서 가져온 데이터로 buckets 상태 업데이트
            } catch (error) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBuckets(); // 컴포넌트가 마운트될 때 데이터를 가져옴
    }, []);

    let deleteBucket = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/hotels/delete/${id}`);
            setBuckets(buckets.filter(bucket => bucket.id !== id));
        } catch (error) {
            setError('Failed to delete item. Please try again later.');
        }
    };

    console.log(buckets)

    let bookHotel = async (id) => {
        try {
            await axios.put(`http://localhost:8080/hotels/book/${id}`);
            setBuckets(buckets.map(bucket =>
                bucket.id === id ? { ...bucket, booked: true } : bucket
            ));
        } catch (error) {
            setError('Failed to book hotel. Please try again later.');
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Bucket List</h1>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table striped bordered hover responsive variant="dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer ID</th>
                        <th>Hotel ID</th>
                        <th>Hotel Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {buckets.length > 0 ? (
                        buckets.map(bucket => (
                            <tr key={bucket.id}>
                                <td>{bucket.id}</td>
                                <td>{bucket.customerId}</td>
                                <td>{bucket.hotelId}</td>
                                <td>{bucket.hotelName}</td>
                                <td>${bucket.price.toFixed(2)}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteBucket(bucket.id)}
                                    >
                                        Delete
                                    </Button>

                                    {!bucket.booked && (
                                        <Button
                                            variant="primary"
                                            onClick={() => bookHotel(bucket.id)}
                                            className="ms-2"
                                        >
                                            예약
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default BucketList;
