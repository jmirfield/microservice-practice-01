import axios from 'axios'

//POST SERVICE
const API = axios.create({ baseURL: "http://posts.com/posts" })
API.defaults.headers.post['Content-Type'] = 'application/json'

export const createPost = async (title, setPosts) => {
    const { data } = await API.post('/create', { title })
    setPosts(prev => ({ [data.id]: { post: data.post, comments: [] }, ...prev }))
}

export const getPosts = async (setPosts) => {
    const { data } = await API.get('')
    console.log(data)
    setPosts(data)
}

export const createComment = async (id, comment, onAdd) => {
    const { data } = await API.post(`/${id}/comment`, { comment })
    onAdd((prev) => [...prev, data])
}

// export const getComments = async (id, setComments) => {
//     const { data } = await COMMENTS.get(`/${id}/comments`)
//     setComments(data)
// }