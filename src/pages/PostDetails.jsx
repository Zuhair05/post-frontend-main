import { useParams } from "react-router"
import * as postService from '../services/posts'
import { useState, useEffect } from "react"

const PostDetails = (props) => {
    const { postId } = useParams()

    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId)
            setPost(postData)
        }
        fetchPost()
    }, [postId])


    if (!post) return <main><div className="loader"></div></main>

    return (
        <article className="card post-card">
            <header className="post-header">
                <h2>{post.title}</h2>
                <p className="post-author">Posted by {post.author?.username || 'Unknown user'} on <span>{new Date(post.createdAt).toLocaleDateString()}</span></p>
            </header>
            <p className="post-text">{post.text}</p>
            <footer className="post-footer">
              {/* comments go here */}
            </footer>
        </article>
    )
}

export default PostDetails