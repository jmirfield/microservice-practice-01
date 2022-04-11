import React from 'react';
import CommentCreate from './CommentCreate';

const PostList = ({ posts }) => {
    return (
        <ul className="container list-unstyled d-flex flex-wrap justify-content-between">
            {posts.map(post => (
                <li key={post.id} className='card mb-3'>
                    <h3 className='card-body'>{post.post}</h3>
                    <CommentCreate postId={post.id} />
                    <CommentList list={[]} />
                </li>
            ))}
        </ul>
    );
}

export default PostList;