import React, { useState } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';


const Comments = ({ postId, list }) => {
    const [comments, setComments] = useState(list || [])

    return (
        <>
            <CommentList list={comments} />
            <CommentCreate postId={postId} onAdd={setComments} />
        </>
    );
}

export default Comments;