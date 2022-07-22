import React from 'react';
import Story from "./Story";
import {ACTION} from "./App";

function StoryList(props) {

    const stories = props.stories.data;
    const reducer = props.reducer;

    return (
        <div>
            {stories.map((story) => <Story story={story} reducer={reducer} key={story.objectID} />
            )}
        </div>
    );
}

export default StoryList;