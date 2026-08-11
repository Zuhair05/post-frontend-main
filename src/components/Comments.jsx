// import { useState } from "react"
// import * as commentService from "../services/comments"

// const Comments = (props) => {
//     const [text, setText] = useState("")

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (!text.trim()) return

//         try {
//             const newComment = await commentService.create(
//                 props.postId,
//                 text.trim()
//             )

//             props.setComments([
//                 ...props.comments,
//                 newComment
//             ])

//             setText("")
//         } catch (error) {
//             console.error("Failed to add comment:", error)
//         }
//     }

//     return (
//         <div className="modal">
//             <div className="modal-content">

//                 <button
//                     type="button"
//                     onClick={props.closeComments}
//                 >
//                     ✕
//                 </button>

//                 <h2>Comments</h2>

//                 {props.comments.length === 0 ? (
//                     <p>No comments yet.</p>
//                 ) : (
//                     props.comments.map((comment) => (
//                         <div
//                             className="modal-comment"
//                             key={comment._id}
//                         >
//                             <strong>
//                                 {comment.author?.username || "Unknown user"}
//                             </strong>

//                             <p>{comment.text}</p>
//                         </div>
//                     ))
//                 )}

//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="text"
//                         value={text}
//                         onChange={(e) => setText(e.target.value)}
//                         placeholder="Write a comment..."
//                     />

//                     <button type="submit">
//                         Add Comment
//                     </button>
//                 </form>

//             </div>
//         </div>
//     )
// }

// export default Comments