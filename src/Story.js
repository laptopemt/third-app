import React from 'react';

function Story(story) {
    return (
        <div>
            <h3><a href={story.url} target="_blank">{story.title}</a></h3>
            <p>Date: {story.created_at}</p>
            <p>Author: {story.author}</p>
        </div>
    );
}

export default Story;