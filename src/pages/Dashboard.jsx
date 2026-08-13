import { useEffect, useState } from "react"
import { index } from "../services/user"

const Dashboard = (props) => {

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await index()
            setAllUsers(usersData)
        }

        fetchUsers()
    }, [])

    return (
        <main className="dashboard">

            <section className="dashboard-header">
                <p className="dashboard-label">
                    YOUR DASHBOARD
                </p>

                <h1>
                    Welcome, {props.user.username} 👋
                </h1>

                <p>
                    Discover the people in your Social App community.
                </p>
            </section>


            <section className="users-section">

                <div className="section-header">
                    <div>
                        <h2>Community</h2>
                        <p>
                            {allUsers.length} members
                        </p>
                    </div>
                </div>


                <div className="users-grid">

                    {allUsers.map((user) => (
                        <article
                            className="user-card"
                            key={user._id}
                        >

                            <div className="user-avatar">
                                {user.username
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="user-info">
                                <h3>
                                    {user.username}
                                </h3>

                                <p>
                                    Social App member
                                </p>
                            </div>

                        </article>
                    ))}

                </div>

            </section>

        </main>
    )
}

export default Dashboard