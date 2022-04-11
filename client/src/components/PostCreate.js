import React, { useState } from 'react';
import { createPost } from '../api';

const PostCreate = ({onPost}) => {
    const [title, setTitle] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        createPost(title, onPost)
        setTitle('')
    }
    return (
        <form className="container" onSubmit={submitHandler}>
            <div className="form-group">
                <label>Create Post</label>
                <input
                    className="form-control"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );
}

export default PostCreate;