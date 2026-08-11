const Comments = (props) => {

    return (
        <div className="modal">
            <div className="modal-content">

                <button onClick={props.onClose}>
                    ✕
                </button>

                <h2>Comments</h2>

                {props.comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    props.comments.map((comment) => (
                        <div key={comment._id}>
                            <strong>
                                {comment.author?.username || 'Unknown user'}
                            </strong>

                            <p>{comment.text}</p>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default Comments