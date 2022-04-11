import React, { useState } from 'react';
import { createComment } from "../api";

const CommentCreate = ({ postId }) => {
    const [comment, setComment] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        createComment(postId, comment)
        setComment('')
    }

    return (
        <form className="form-inline mb-2" style={{ padding: '10px' }} onSubmit={submitHandler}>
            <label className="form-label">Comment</label>
            <input className="form-control mx-2" value={comment} onChange={e => setComment(e.target.value)} />
            <button className="btn btn-primary">Submit</button>
        </form>
    );
}

export default CommentCreate;