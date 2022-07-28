import React, {useState} from 'react';

function StorySearch(props) {

    const updateSearchTerm = props.updateSearchTerm;
    const [searchTerm, changeTerm] = useState(props.searchTerm);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSearchTerm(searchTerm);
        localStorage.setItem('searchTerm', searchTerm);
    };

    const handleChange = (e) => {
        changeTerm(e.target.value);
    };

    return (
        <div style={{ padding: 10, margin: 10 }}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search" style={{ padding: 5}}>Search</label>
                <input type="text" onChange={handleChange} name="search" value={searchTerm} placeholder="Type to Search"/>
            </form>
        </div>
    );
}

export default StorySearch;