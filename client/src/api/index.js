import axios from 'axios'

//POST SERVICE
const POSTS = axios.create({ baseURL: "http://localhost:4000/posts" })
POSTS.defaults.headers.post['Content-Type'] = 'application/json'

//COMMENT SERVICE
const COMMENTS = axios.create({ baseURL: "http://localhost:4001/posts" })
COMMENTS.defaults.headers.post['Content-Type'] = 'application/json'

export const createPost = async (title, setPosts) => {
    const { data } = await POSTS.post('', { title })
    setPosts(prev => [data, ...prev])
}

export const getPosts = async (setPosts) => {
    const { data } = await POSTS.get('')
    const posts = Object.keys(data).map(key => ({ post: data[key], id: key }))
    setPosts(posts)
}

export const createComment = async (id, comment) => {
    const { data } = await COMMENTS.post(`/${id}/comment`, { comment })
    console.log(data)
}