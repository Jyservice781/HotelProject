import { Button, Form } from "react-bootstrap";

const SearchForm = ({
                        searchType,
                        keyword,
                        minPrice,
                        maxPrice,
                        startDate,
                        endDate,
                        isSeller,
                        handleSearchTypeChange,
                        handleKeywordChange,
                        handleMinPriceChange,
                        handleMaxPriceChange,
                        handleStartDateChange,
                        handleEndDateChange,
                        handleSearchSubmit,
                        moveToWrite
                    }) => {
    return (
        <Form className="mt-4" onSubmit={handleSearchSubmit}>
            <div className="row mb-3">
                <div className="col-md-3">
                    <Form.Select value={searchType} onChange={handleSearchTypeChange}>
                        <option value="name">호텔명</option>
                        <option value="address">주소</option>
                    </Form.Select>
                </div>
                <div className="col-md-3">
                    <Form.Control
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={keyword}
                        onChange={handleKeywordChange}
                    />
                </div>
                <div className="col-md-2">
                    <Form.Control
                        type="number"
                        placeholder="최소 가격"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                    />
                </div>
                <div className="col-md-2">
                    <Form.Control
                        type="number"
                        placeholder="최대 가격"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-3">
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="col-md-3">
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div className="col-md-2">
                    <Button className="btn btn-outline-primary" type="submit">검색</Button>
                </div>
                {isSeller && (
                    <div className="col-md-2">
                        <Button className="btn btn-outline-success" onClick={moveToWrite}>글 작성하기</Button>
                    </div>
                )}
            </div>
        </Form>
    );
};

export default SearchForm;
