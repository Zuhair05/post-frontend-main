import { Link } from "react-router"
import {useNavigate} from "react-router"

const PostList = (props) => {
  const navigate = useNavigate()

  return (
    <main className="post-list">
      {props.posts.map((post) => (
        <Link key={post._id} to={`/posts/${post._id}`}>
            <article className="card">
                <header>
                    <span className="post-category">{post.category}</span>
                    <h2 key={post._id}>{post.title}</h2> 
                    <p className="post-author">Posted by {post.author?.username || 'Unknown user'}</p>
                </header>
                <p className="post-text">{post.text}</p>
                <footer className="post-footer">
                <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span>
                    {post.comments?.length || 0} comments
                </span>
                </footer>
            </article>
        </Link>
      ))}
    </main>
  )
}

export default PostList