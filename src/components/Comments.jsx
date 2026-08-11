


const Comments = (props) => {
    if (!props.comments || props.comments.length === 0) {
        return <p>No comments yet.</p>
    }

    return (
        <div className="modal">
            <div className="modal-content">

                <button onClick={props.onClose}>
                    ✕
                </button>

                <h2>Comments</h2>

                {props.comments.map((comment) => (
                    <div key={comment._id}>
                        <strong>
                            {comment.author?.username}
                        </strong>

                        <p>{comment.text}</p>
                    </div>
                ))}

                <form onSubmit={props.handleSubmit}>
                    <input
                        type="text"
                        value={props.text}
                        onChange={props.handleChange}
                        placeholder="Write a comment..."
                    />

                    <button type="submit">
                        Comment
                    </button>
                </form>

            </div>
        </div>
    )
}

export default CommentsModal

    


export default Comments