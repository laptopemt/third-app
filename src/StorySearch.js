import React, {useEffect, useState} from 'react';

function StorySearch(props) {

    const updateSearchTerm = props.updateSearchTerm;
    const [searchTerm, changeTerm] = useState(props.searchTerm);
    const [recentSearches, updateRecentSearchList] = useState(() => {
        if(localStorage.getItem("recentSearches") !== null){
            return JSON.parse(localStorage.getItem("recentSearches"));
        }
        else{
            return [];
        }

    });

    useEffect(() =>{
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }, [recentSearches])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSearchTerm(searchTerm);
        addRecentSearch();
    };

    const addRecentSearch = () => {

        if(recentSearches.length > 0) {
            updateRecentSearchList((searchList) => {
                const filteredList = searchList.filter(sourceList => sourceList !== searchTerm);
                return filteredList;
            });
        }

        updateRecentSearchList((recentSearchesList) => [searchTerm, ...recentSearchesList.slice(0, 4)]);
    }

    const handleChange = (e) => {
        changeTerm(e.target.value);
    };

    const handleRecentSearch = (e) => {
        const recentSearchTerm = e.target.value;
        changeTerm(recentSearchTerm);
        updateSearchTerm(recentSearchTerm);
    }

    return (
        <div style={{ padding: 10, margin: 10 }}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search" style={{ padding: 5}}>Search</label>
                <input type="text" onChange={handleChange} name="search" value={searchTerm} placeholder="Type to Search"/>
            </form>
            <br/>
            <div>
                <div>Recent Searches</div>
                {recentSearches.length ?
                    <ul style={{listStyleType: "none"}}>
                    {recentSearches.map((search, key) => {
                        return <li style={{display: "inline", padding: 3}} key={key}><button value={search} onClick={handleRecentSearch}>{search}</button></li>
                    })}
                    </ul>
                    :
                    <p>None</p>
                }
            </div>
        </div>
    );
}

export default StorySearch;