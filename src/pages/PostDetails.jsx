import { useParams } from "react-router"
import * as postServices from '../services/posts'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Comments from "../components/Comments"
import * as commentService from "../services/comments"

const PostDetails = (props) => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postServices.show(postId)
            setPost(postData)
        }

        fetchPost()
    }, [postId])

    const openComments = async () => {
        const commentsData = await commentService.index(postId)
        setComments(commentsData)
        setShowComments(true)
    }

    const closeComments = () => {
        setShowComments(false)
    }

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
            <button  onClick={showComments ? closeComments : openComments}>
                 💬 Comments
            </button>

            {props.user && props.user._id === post.author?._id && (
                <button onClick={() => props.handleDelete(post._id)}>Delete</button>
            )}
            {post.author._id === props.user._id && (
                 <div className="actions">
                    <button onClick={() => navigate(`/posts/${post._id}/edit`)}>Edit</button>
                </div>
            )}

            <footer className="hoot-footer">
                {/* comments go here */}
            </footer>
          {showComments && (
    <section className="comments">

        <h2>Comments</h2>

        {comments.length === 0 ? (
            <p>No comments yet.</p>
        ) : (
            comments.map((comment) => (
                <div
                    className="comment"
                    key={comment._id}
                >
                    <strong>
                        {comment.author?.username || "Unknown user"}
                    </strong>

                    <p>{comment.text}</p>
                </div>
            ))
        )}

        <Comments
            postId={postId}
            comments={comments}
            setComments={setComments}
        />

    </section>
)}
        </article>
    )
}

export default PostDetails