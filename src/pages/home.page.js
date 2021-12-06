import React from 'react';
import Layout from '../components/layout.component';
function HomePage() {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    return (
        <Layout>
            <h1>Home</h1>
            {userState != null && userState.name != null ? <h2>{`Chào mừng bạn, ${userState.name}`}</h2> : null}
        </Layout>
    )
}

export default HomePage;

