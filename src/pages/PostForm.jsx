import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import * as postService from "../services/posts"

const PostForm = (props) => {

    const navigate = useNavigate()
    const { postId } = useParams()

    const initialState = {
        title: "",
        text: "",
        image: "",
        category: "",
    }

    const [formData, setFormData] = useState(initialState)


    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        })
    }


    const handleSubmit = async (evt) => {

        evt.preventDefault()

        try {

            if (postId) {

                await props.handleUpdatePost(
                    postId,
                    formData
                )

            } else {

                await props.handleAddPost(formData)

            }

            setFormData(initialState)

        } catch (error) {

            console.error(
                "Failed to save post:",
                error
            )

        }
    }


    useEffect(() => {

        const fetchPost = async () => {

            const postData =
                await postService.show(postId)

            setFormData({
                title: postData.title || "",
                text: postData.text || "",
                image: postData.image || "",
                category: postData.category || "",
            })
        }

        if (postId) {
            fetchPost()
        }

        return () => {
            setFormData(initialState)
        }

    }, [postId])


    return (

        <main className="post-form-page">

            <section className="post-form-card">

                <header className="post-form-header">

                    <p className="post-form-label">
                        {postId
                            ? "EDIT YOUR POST"
                            : "CREATE SOMETHING"}
                    </p>

                    <h1>
                        {postId
                            ? "Edit Post"
                            : "Create New Post"}
                    </h1>

                    <p>
                        {postId
                            ? "Update your post and save your changes."
                            : "Share something with the community."}
                    </p>

                </header>


                <form
                    className="post-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-field">

                        <label htmlFor="title">
                            Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Give your post a title..."
                            required
                        />

                    </div>

                    <div className="form-field">

                        <label htmlFor="category">
                            Category
                        </label>

                        <input
                            id="category"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g. Technology, Gaming..."
                        />

                    </div>


                    {/* Text */}

                    <div className="form-field">

                        <label htmlFor="text">
                            Content
                        </label>

                        <textarea
                            id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            placeholder="What do you want to share?"
                            rows="7"
                            required
                        />

                    </div>


                    {/* Image */}

                    <div className="form-field">

                        <label htmlFor="image">
                            Image URL
                        </label>

                        <input
                            id="image"
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />

                        <small>
                            Optional — add an image URL to your post.
                        </small>

                    </div>


                    {/* Actions */}

                    <div className="post-form-actions">

                        <button
                            type="button"
                            className="form-cancel"
                            onClick={() => navigate("/posts")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="form-submit"
                        >
                            {postId
                                ? "Save Changes"
                                : "Create Post"}
                        </button>

                    </div>

                </form>

            </section>

        </main>
    )
}

export default PostForm