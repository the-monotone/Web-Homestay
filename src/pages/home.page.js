import React from 'react';
function HomePage() {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    return (
        <main>
            <h1>Home</h1>
            {userState != null && userState.username != null ? <h2>{`Chào mừng bạn, ${userState.username}`}</h2> : null}
        </main>
    )
}

export default HomePage;

