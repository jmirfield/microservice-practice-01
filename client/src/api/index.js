import axios from 'axios'

//POST SERVICE
const POSTS = axios.create({ baseURL: "http://localhost:4000/posts" })
POSTS.defaults.headers.post['Content-Type'] = 'application/json'

//COMMENT SERVICE
const COMMENTS = axios.create({ baseURL: "http://localhost:4001/posts" })
COMMENTS.defaults.headers.post['Content-Type'] = 'application/json'

//QUERY SERVICE
const QUERY = axios.create({ baseURL: "http://localhost:4002/posts" })
QUERY.defaults.headers.post['Content-Type'] = 'application/json'

export const createPost = async (title, setPosts) => {
    const { data } = await POSTS.post('', { title })
    setPosts(prev => ({ [data.id]: { post: data.post, comments: [] }, ...prev }))
}

export const getPosts = async (setPosts) => {
    const { data } = await QUERY.get('')
    console.log(data)
    setPosts(data)
}

export const createComment = async (id, comment, onAdd) => {
    const { data } = await COMMENTS.post(`/${id}/comment`, { comment })
    onAdd((prev) => [...prev, data])
}

// export const getComments = async (id, setComments) => {
//     const { data } = await COMMENTS.get(`/${id}/comments`)
//     setComments(data)
// }