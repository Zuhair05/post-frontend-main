import { Link } from "react-router"

const Landing = () => {
    return (
        <main className="landing">

            <section className="landing-content">

                <div className="landing-icon">
                    ✦
                </div>

                <h1>Welcome to Social App 👋</h1>

                <p>
                    Connect, share your thoughts, and interact
                    with your community.
                </p>

                <p className="landing-subtitle">
                    Sign up or sign in to see your dashboard.
                </p>

                <div className="landing-actions">
                    <Link to="/sign-up" className="landing-button primary">
                        Sign Up
                    </Link>

                    <Link to="/sign-in" className="landing-button secondary">
                        Sign In
                    </Link>
                </div>

            </section>

        </main>
    )
}

export default Landing