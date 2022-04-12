import React from 'react';

const CommentList = ({ list }) => {
    return (
        <ul>
            {list && list.map(comment => (
                <li key={comment.id}>{comment.status !== 'rejected' ? comment.status !== 'pending' ? comment.comment : 'Comment is pending moderation' : 'Comment has been rejected'}</li>
            ))}
        </ul>
    );
}

export default CommentList;