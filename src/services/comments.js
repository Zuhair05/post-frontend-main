const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`

const index = async (postId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const create = async (postId, text) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text
            })
        })

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const update = async (postId, commentId, text) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${postId}/comments/${commentId}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text
                })
            }
        )

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async (postId, commentId) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${postId}/comments/${commentId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export {
    index,
    create,
    update,
    deleteComment
}