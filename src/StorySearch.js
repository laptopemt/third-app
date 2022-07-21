import React from 'react';

function StorySearch(props) {
    return (
        <div style={{ padding: 10, margin: 10, border: '1px solid #000' }}>
            <h2>Search</h2>
            <input type="text" name="search" placeholder="Type to Search"/>
        </div>
    );
}

export default StorySearch;