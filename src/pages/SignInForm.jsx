import { useNavigate } from "react-router"
import { useState } from "react"
import { signIn } from "../services/auth"

const SignInForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
    }

    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setMessage('')

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const signedInUser = await signIn(formData)

            props.setUser(signedInUser)

            setFormData(initialState)

            navigate('/')

        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <main className="auth-page">

            <section className="auth-content">

                <div className="auth-icon">
                    ✦
                </div>

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Sign in to continue to your account.
                </p>

                {message && (
                    <p className="auth-error">
                        {message}
                    </p>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            required
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            required
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        Sign In
                    </button>

                    <button
                        className="auth-cancel"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>

                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <button onClick={() => navigate('/sign-up')}>
                        Sign Up
                    </button>
                </p>

            </section>

        </main>
    )
}

export default SignInForm