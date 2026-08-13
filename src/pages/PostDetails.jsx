import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import * as postServices from "../services/posts"
import * as commentService from "../services/comments"
import Comments from "../components/Comments"

const PostDetails = (props) => {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editText, setEditText] = useState("")

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

    const handleDeleteComment = async (commentId) => {
        await commentService.deleteComment(postId, commentId)
        setComments(
            comments.filter((comment) => comment._id !== commentId)
        )
    }

    const handleEditClick = (comment) => {
        setEditingCommentId(comment._id)
        setEditText(comment.text)
    }

    const handleUpdateComment = async (commentId) => {
        if (!editText.trim()) return
        const updatedComment = await commentService.update(
            postId,
            commentId,
            editText.trim()
        )
        setComments((currentComments) =>
            currentComments.map((comment) =>
                comment._id === commentId
                    ? { ...comment, ...updatedComment }
                    : comment
            )
        )
        setEditingCommentId(null)
        setEditText("")
    }

    if (!post) {
        return (
            <main className="details-page">
                <div className="loader"></div>
            </main>
        )
    }

    const isAuthor = props.user && props.user._id === post.author?._id

    return (
        <main className="details-page">
            <article className="details-post">
                {post.image && (
                    <img
                        className="details-image"
                        src={post.image}
                        alt={post.title}
                    />
                )}
                <div className="details-content">
                    <div className="details-author-row">
                        <div className="details-author">
                            <div className="details-avatar">
                                {post.author?.username?.charAt(0).toUpperCase() || "?"}
                            </div>
                            <div>
                                <strong>{post.author?.username || "Unknown user"}</strong>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="details-title">{post.title}</h1>
                    <p className="details-text">{post.text}</p>
                    <div className="details-actions">
                        <button
                            className="comments-button"
                            onClick={showComments ? closeComments : openComments}
                        >
                            💬 {showComments ? "Hide Comments" : "Comments"}
                        </button>
                        {isAuthor && (
                            <>
                                <button
                                    className="edit-button"
                                    onClick={() => navigate(`/posts/${post._id}/edit`)}
                                >
                                    ✏ Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => props.handleDelete(post._id)}
                                >
                                    🗑 Delete
                                </button>
                            </>
                        )}
                    </div>
                    {showComments && (
                        <section className="details-comments">
                            <div className="comments-header">
                                <h2>Comments</h2>
                                <span>{comments.length}</span>
                            </div>
                            {comments.length === 0 ? (
                                <div className="no-comments">
                                    <p>No comments yet.</p>
                                    <span>Be the first to comment!</span>
                                </div>
                            ) : (
                                <div className="comments-list">
                                    {comments.map((comment) => (
                                        <div className="detail-comment" key={comment._id}>
                                            <div className="comment-avatar">
                                                {comment.author?.username?.charAt(0).toUpperCase() || "?"}
                                            </div>
                                            <div className="comment-body">
                                                <div className="comment-header">
                                                    <strong>{comment.author?.username || "Unknown user"}</strong>
                                                </div>
                                                {editingCommentId === comment._id ? (
                                                    <div className="edit-comment">
                                                        <input
                                                            type="text"
                                                            value={editText}
                                                            onChange={(e) => setEditText(e.target.value)}
                                                        />
                                                        <div className="comment-actions">
                                                            <button onClick={() => handleUpdateComment(comment._id)}>
                                                                Save
                                                            </button>
                                                            <button className="cancel-comment"onClick={() => { setEditingCommentId(null)
                                                               setEditText("") }} >Cancel </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p>{comment.text}</p>
                                                        {props.user && props.user._id === comment.author?._id && (
                                                            <div className="comment-actions">
                                                                <button onClick={() => handleEditClick(comment)}>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="comment-delete"
                                                                    onClick={() => handleDeleteComment(comment._id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Comments
                                postId={postId}
                                comments={comments}
                                setComments={setComments}
                                user={props.user}
                            />
                        </section>
                    )}
                </div>
            </article>
        </main>
    )
}

export default PostDetails