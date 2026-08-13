import { Link } from "react-router"

const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav className="navbar">

            <Link className="nav-brand" to="/">
                ✦ Social App
            </Link>

            {props.user ? (
                <ul className="nav-links">

                    <li className="nav-welcome">
                        Welcome, {props.user.username}!
                    </li>

                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>

                    <li>
                        <Link className="nav-new-post" to="/posts/new">
                            + New Post
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/"
                            onClick={handleSignOut}
                            className="nav-signout"
                        >
                            Sign Out
                        </Link>
                    </li>

                </ul>
            ) : (
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            )}

        </nav>
    )
}

export default Nav