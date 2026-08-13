import { useState } from "react"
import { signUp } from "../services/auth"
import { useNavigate } from "react-router"

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            const newUser = await signUp(formData)

            props.setUser(newUser)

            setFormData(initialState)

            navigate('/')

        } catch (err) {
            setMessage(err.message)
        }
    }

    const isFormValid = () => {
        return (
            formData.username &&
            formData.email &&
            formData.password &&
            formData.password === formData.confirmPassword
        )
    }

    return (
        <main className="auth-page">

            <section className="auth-content">

                <div className="auth-icon">
                    ✦
                </div>

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Join Social App and start sharing.
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
                            onChange={handleChange}
                            required
                            placeholder="Choose a username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
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
                            onChange={handleChange}
                            required
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={!isFormValid()}
                    >
                        Sign Up
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
                    Already have an account?{" "}
                    <button onClick={() => navigate('/sign-in')}>
                        Sign In
                    </button>
                </p>

            </section>

        </main>
    )
}

export default SignUpForm