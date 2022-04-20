import React from 'react';
import Comments from './Comments';

const PostList = ({ posts }) => {
    return (
        <ul className="container list-unstyled d-flex flex-wrap justify-content-between">
            {Object.keys(posts).map(id => (
                <li key={id} className='card mb-3'>
                    <h4 className='card-body'>{posts[id].post}</h4>
                    <Comments postId={id} list={posts[id].comments} />
                </li>
            ))}
        </ul>
    );
}

export default PostList;