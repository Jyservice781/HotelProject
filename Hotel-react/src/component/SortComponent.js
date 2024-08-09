import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";

const SortComponent = ({sortOption, setSortOption}) => {
    const sortSelect = (eventKey) => {
        setSortOption(eventKey)
    }
    return(
        <DropdownButton id="sort-options" title="정렬 기준" onSelect={sortSelect}>
            <Dropdown.Item eventKey="latest">날짜</Dropdown.Item>
            <Dropdown.Item eventKey="highScore">평점(높은)</Dropdown.Item>
            <Dropdown.Item eventKey="lowScore">평점(낮은)</Dropdown.Item>
        </DropdownButton>
    )
}
export default SortComponent
