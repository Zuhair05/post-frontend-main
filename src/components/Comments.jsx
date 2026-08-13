import { useState } from "react"
import * as commentService from "../services/comments"

const Comments = (props) => {

    const [text, setText] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!text.trim()) return

        try {

            const newComment = await commentService.create(
                props.postId,
                text.trim()
            )

            props.setComments([
                ...props.comments,
                newComment
            ])

            setText("")

        } catch (error) {

            console.error(
                "Failed to add comment:",
                error
            )

        }
    }


    return (
        <div className="comment-form">

            <form onSubmit={handleSubmit}>

                <div className="comment-input-wrapper">

                    <div className="comment-form-avatar">
                        {props.user?.username
                            ?.charAt(0)
                            .toUpperCase() || "?"}
                    </div>

                    <input
                        type="text"
                        value={text}
                        onChange={(e) =>
                            setText(e.target.value)
                        }
                        placeholder="Write a comment..."
                    />

                </div>


                <button
                    type="submit"
                    disabled={!text.trim()}
                >
                    Comment
                </button>

            </form>

        </div>
    )
}

export default Comments