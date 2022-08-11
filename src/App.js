
import React, {useState, useEffect, useReducer} from 'react';
import './App.css';
import StorySearch from "./StorySearch.js";
import StoryList from "./StoryList";
import Sort from "./Sort";
import axios from "axios";
import { sortBy } from "lodash";

const CONFIG = {
    API_ENDPOINT: "https://hn.algolia.com/api/v1/search?query="
};

export const ACTION = {
    FETCH_STORIES: 'get-stories',
    FETCH_STORIES_ERROR: 'story-error',
    FETCH_STORIES_SUCCESS: 'story-success',
    SEARCH_SUBJECT: 'search-story',
    ADD_STORY: 'add-story',
    DELETE_STORY: 'delete-story',
    SORT_LIST: 'sort-list'
};

const reducer = (state, action) => {
    switch (action.type){
        case ACTION.FETCH_STORIES:
            return { ...state, isLoading: true, isError: false}
        case ACTION.FETCH_STORIES_SUCCESS:
            return { data: action.payload, isLoading: false, isError: false}
        case ACTION.FETCH_STORIES_ERROR:
            return {...state, isLoading: false, isError: true}
        case ACTION.DELETE_STORY:
            const delStoryID = action.payload.storyId;
            const filteredStoryList = state.data.filter(story => story.objectID !== delStoryID);
            return { data: filteredStoryList, isLoading: false, isError: false}
        case ACTION.SORT_LIST:
            const sortListBy = action.payload.sortListBy;
            const isAscending = action.payload.isAscending;

            let data = sortBy(state.data, sortListBy)
            if(!isAscending) {data.reverse()}
            return { data: data, isLoading: false, isError: false}

        default:
            return { ...state, isLoading: false, isError: false}

    }

}


function App() {

    const [stories, storyReducer] = useReducer(reducer, {data: [], isLoading: false, isError: false});
    const [searchTerm, updateSearchTerm] = useState( "");
    const [resultPage, updateResultPage] = useState(1);

    useEffect(() => {
        storyReducer({type: ACTION.FETCH_STORIES});
        const pageUrl = resultPage > 1 ? `&page=${resultPage}` : "";
        const url = `${CONFIG.API_ENDPOINT}${searchTerm}${pageUrl}`;

        axios.get(url)
            .then(result => {
                storyReducer({ type: ACTION.FETCH_STORIES_SUCCESS, payload: result.data.hits});
            })
            .catch(() => {
                storyReducer({ type: ACTION.FETCH_STORIES_ERROR});
            })
    }, [searchTerm, resultPage]);

    const minusPage = () => updateResultPage(currPage => {
        if(currPage <= 1)
        {
            return 1;
        }
        return currPage - 1
    } );
    const addPage = () => updateResultPage( currPage => currPage + 1 );

  return (
    <div>
        {stories.isLoading && <p>Loading</p>}
        {stories.isError && <p>Oops, Something went wrong</p>}
        <StorySearch updateSearchTerm={updateSearchTerm} searchTerm={searchTerm} />
        <Sort reducer={storyReducer} />
        <div style={{padding: 10, margin: 10}}>
            <StoryList stories={stories} reducer={storyReducer} />
        </div>
        <div>
            <button onClick={minusPage}>Previous</button>
            <p>Page {resultPage}</p>
            <button onClick={addPage}>Next</button>
        </div>
    </div>
  );
}

export default App;
