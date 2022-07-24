
import React, {useState, useEffect, useReducer} from 'react';
import './App.css';
import StorySearch from "./StorySearch.js";
import StoryList from "./StoryList";

const CONFIG = {
    API_ENDPOINT: "https://hn.algolia.com/api/v1/search?query="
};

export const ACTION = {
    FETCH_STORIES: 'get-stories',
    FETCH_STORIES_ERROR: 'story-error',
    FETCH_STORIES_SUCCESS: 'story-success',
    SEARCH_SUBJECT: 'search-story',
    ADD_STORY: 'add-story',
    DELETE_STORY: 'delete-story'
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
        default:
            return { ...state, isLoading: false, isError: false}

    }

}

function App() {

    const [stories, storyReducer] = useReducer(reducer, {data: [], isLoading: false, isError: false});
    const [searchTerm, updateSearchTerm] = useState("react");

    useEffect(() => {
        storyReducer({type: ACTION.FETCH_STORIES});

        fetch(`${CONFIG.API_ENDPOINT}${searchTerm}`)
            .then((response => response.json()))
            .then(result => {
                storyReducer({type: ACTION.FETCH_STORIES_SUCCESS, payload: result.hits});
            })
            .catch(() => storyReducer({ type: ACTION.FETCH_STORIES_ERROR}))
    }, [searchTerm]);

  return (
    <div>
        {stories.isLoading && <p>Loading</p>}
        {stories.isError && <p>Oops, Something went wrong</p>}
        <StorySearch updateSearchTerm={updateSearchTerm} />
        <div style={{padding: 10, margin: 10}}>
            <StoryList stories={stories} reducer={storyReducer} />
        </div>
    </div>
  );
}

export default App;
