import { Link } from "react-router"

const PostList = (props) => {

    return (
        <main className="posts-page">

            <header className="posts-header">
                <div>
                    <p className="posts-label">COMMUNITY FEED</p>

                    <h1>Latest Posts</h1>

                    <p>
                        See what everyone is sharing.
                    </p>
                </div>

                <Link
                    to="/posts/new"
                    className="create-post-button"
                >
                    + Create Post
                </Link>
            </header>


            <section className="posts-feed">

                {props.posts.length === 0 ? (
                    <div className="empty-posts">
                        <div className="empty-icon">
                            ✦
                        </div>

                        <h2>No posts yet</h2>

                        <p>
                            Be the first person to share something
                            with the community.
                        </p>

                        <Link
                            to="/posts/new"
                            className="create-post-button"
                        >
                            Create the first post
                        </Link>
                    </div>
                ) : (

                    props.posts.map((post) => (

                        <Link
                            key={post._id}
                            to={`/posts/${post._id}`}
                            className="post-link"
                        >

                            <article className="post-card">

                                {post.image && (
                                    <img
                                        className="post-image"
                                        src={post.image}
                                        alt={post.title}
                                    />
                                )}


                                <div className="post-content">

                                    <div className="post-top">

                                        <span className="post-category">
                                            {post.category}
                                        </span>

                                        <span className="post-date">
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString()}
                                        </span>

                                    </div>

                                    <div className="post-author">

                                        <div className="post-avatar">
                                            {post.author?.username
                                                ?.charAt(0)
                                                .toUpperCase() || "?"}
                                        </div>

                                        <span>
                                            {post.author?.username ||
                                                "Unknown user"}
                                        </span>

                                    </div>

                                    <h2 className="post-title">
                                        {post.title}
                                    </h2>




                                    <p className="post-text">
                                        {post.text}
                                    </p>


                                    <footer className="post-footer">

                                        <span className="read-post">
                                            Read post →
                                        </span>

                                    </footer>

                                </div>

                            </article>

                        </Link>

                    ))

                )}

            </section>

        </main>
    )
}

export default PostList