
import React, {useState, useEffect, useReducer} from 'react';
import './App.css';
import StorySearch from "./StorySearch.js";

const CONFIG = {
    API_ENDPOINT: "https://hn.algolia.com/api/v1/search?query="
};

export const ACTION = {
    FETCH_STORIES: 'get-stories',
    FETCH_STORIES_ERROR: 'story-error',
    FETCH_STORIES_SUCCESS: 'story-success',
    FILTER_STORY: 'filter-story',
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
        case ACTION.ADD_STORY:
            return { ...state, isLoading: false, isError: false}
        case ACTION.DELETE_STORY:
            return { ...state, isLoading: false, isError: false}
        case ACTION.FILTER_STORY:
            return { ...state, isLoading: false, isError: false}
        default:
            return { ...state, isLoading: false, isError: false}

    }

}

function App() {

    const [stories, storyReducer] = useReducer(reducer, {data: [], isLoading: false, isError: false});

    useEffect(() => {
        storyReducer({type: ACTION.FETCH_STORIES});

        fetch(`${CONFIG.API_ENDPOINT}react`)
            .then((response => response.json()))
            .then(result => {
                storyReducer({type: ACTION.FETCH_STORIES_SUCCESS, payload: result.hits});
            })
            .catch(() => storyReducer({ type: ACTION.FETCH_STORIES_ERROR}))
    }, []);

  return (
    <div>
        {stories.isLoading && <p>Loading</p>}
        {stories.isError && <p>Oops, Something went wrong</p>}
      <StorySearch />
        <pre>{JSON.stringify(stories.data[0])}</pre>
    </div>
  );
}

export default App;
