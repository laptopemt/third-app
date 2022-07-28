import React, {useState} from 'react';
import {ACTION} from "./App";

function Sort(props) {

    const reducer = props.reducer;

    const [isAscending, changeIsAscending] = useState(true);

    const handleClick = (e) => {
        const sortValue = e.target.name;
        reducer({type: ACTION.SORT_LIST, payload: {sortListBy: sortValue, isAscending: isAscending}})
        changeIsAscending(!isAscending);
    };

    return (
        <div>
            <label>Sort By: </label>
            <button name="title" onClick={handleClick}>Title</button>
            <button name="created_at" onClick={handleClick}>Created At</button>
            <button name="author" onClick={handleClick}>Author</button>
        </div>
    );
}

export default Sort;
