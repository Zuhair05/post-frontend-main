const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`

const index = async (postId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const data = await res.json()


        if (data.err) {
            throw new Error("Failed to fetch comments")
        }

        return data
    } catch (error) {
        console.error("Error fetching comments:", error)
        throw error
    }
}

const create = async (postId, text) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}/comments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        })

        const data = await res.json()
        if (data.err) {
            throw new Error(data.err || "Failed to create comment")
        }

        return data
    } catch (error) {
        console.error("Error creating comment:", error)
        throw error
    }
}

const update = async (postId, commentId, text) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${postId}/comments/${commentId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text
                })
            }
        )

        const data = await res.json()
        if (data.err) {
            throw new Error(data.err || "Failed to update comment")
        }

        return data
    } catch (error) {
        console.error("Error updating comment:", error)
        throw error
    }
}

const deleteComment = async (postId, commentId) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${postId}/comments/${commentId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )

        const data = await res.json()
        if (data.err) {
            throw new Error(data.err || "Failed to delete comment")
        }

        return data
    } catch (error) {
        console.error("Error deleting comment:", error)
        throw error
    }
}

export {
    index,
    create,
    update,
    deleteComment
}