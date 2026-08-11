import { useParams } from "react-router"
import * as postServices from '../services/posts'
import { useState, useEffect } from "react"

const PostDetails = (props) => {
    const { postId } = useParams()

    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postServices.show(postId)
            setPost(postData)
        }

        fetchPost()
    }, [postId])

    if (!post) {
        return <main><div className="loader"></div></main>
    }

    return (
        <article className="card hoot-card">
            <header className="hoot-header">
                <div>
                    {post.image && <img src={post.image} alt={post.title} />}
                </div>
                <h2>{post.title}</h2>

                <p className="hoot-author">
                    Posted by {post.author?.username || 'Unknown user'} on{" "}
                    <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                </p>
            </header>

            <p className="hoot-text">
                {post.text}
            </p>

            {props.user && props.user._id === post.author?._id && (
                <button onClick={() => props.handleUpdate(post._id)}>Edit</button>
            )}

            {props.user && props.user._id === post.author?._id && (
                <button onClick={() => props.handleDelete(post._id)}>Delete</button>
            )}
           

            <footer className="hoot-footer">
                {/* comments go here */}
            </footer>
        </article>
    )
}

export default PostDetails