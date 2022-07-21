import React from 'react';

function StorySearch(props) {
    return (
        <div style={{ padding: 10, margin: 10 }}>
            <label htmlFor="search" style={{ padding: 5}}>Search</label>
            <input type="text" name="search" placeholder="Type to Search"/>
        </div>
    );
}

export default StorySearch;