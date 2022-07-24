import React from 'react';
import {ACTION} from "./App";

function Story(props) {
    const story = props.story;
    const reducer = props.reducer;

    const handleDelete = () => {
        reducer({type: ACTION.FETCH_STORIES});
        reducer({
            type:ACTION.DELETE_STORY,
            payload: {storyId: story.objectID},
        });

    };

    return (
        <div>
            <h3><a href={story.url} target="_blank">{story.title}</a> <button onClick={handleDelete}>X</button></h3>

            <p>Date: {story.created_at}</p>
            <p>Author: {story.author}</p>
        </div>
    );
}

export default Story;