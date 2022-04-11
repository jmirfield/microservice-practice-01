import React, { useState, useEffect } from 'react';
import { getPosts } from './api';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList'

const App = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getPosts(setPosts)
    }, [])
    return (
        <div className="container">
            <h1>Entry Point, Hello world</h1>
            <PostCreate onPost={setPosts}/>
            <h2>Posts</h2>
            <PostList posts={posts} />
        </div>
    );
}

export default App;