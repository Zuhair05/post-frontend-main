import { Link } from "react-router"

const PostList = (props) => {
    console.log(props.posts)

    return (
        <div>
            {props.posts.map((post) => (
                <div key={post._id}>

                    <Link to={`/posts/${post._id}`}>

                        {post.image && (
                            <img
                                src={post.image}
                                alt={post.title}
                            />
                        )}

                        <h2>{post.title}</h2>

                        <p>
                            Posted by {post.author?.username || 'Unknown user'}
                        </p>

                        <p>{post.text}</p>

                        <p>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>

                    </Link>

                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            props.openComments(post._id)
                        }}
                    >
                        💬 Comments
                    </button>

                </div>
            ))}
        </div>
    )
}

export default PostList