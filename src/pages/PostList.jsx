import { Link } from "react-router"

const PostList = (props) => {

  console.log(props.posts)
  return (
    <main className="post-list">
      {props.posts.map((post) => (
        <Link key={post._id} to={`/posts/${post._id}`}>
            <article className="card">
                <header>
                  <span>{post.image && (
                    <img src={post.image} alt={post.title}/>
                  )}</span>
                    <h2 key={post._id}>{post.title}</h2> 
                    <p className="post-author">Posted by {post.author?.username || 'Unknown user'}</p>
                </header>
                <p className="post-text">{post.text}</p>
                <footer className="post-footer">
                <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
                </footer>
            </article>
        </Link>
      ))}
    </main>
  )
}

export default PostList