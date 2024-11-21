// src/app/components/Home.js
import React from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation to handle routing

const Home = () => {
    const router = useRouter();

    // Navigate to the Rate Card Generator page
    const goToRateCardGenerator = () => {
        router.push('/rate-card-generator'); // Navigate to the Rate Card Generator page
    };

    // Navigate to the Rate Guide page
    const goToRateGuide = () => {
        router.push('/rate-guide'); // Navigate to the Rate Guide page
    };

    // Navigate to the Rate Guide page
    const goToNetRate = () => {
        router.push('/net-rate-card'); // Navigate to the Rate Guide page
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.welcome}>Welcome to Business Facilitation</h1>
            <div style={styles.buttonGroup}>
                <button onClick={goToRateCardGenerator} style={styles.button}>
                    Rate Card Generator
                </button>
                <button onClick={goToRateGuide} style={styles.button}>
                    Rate Guide
                </button>
                <button onClick={goToNetRate} style={styles.button}>
                    Net Rate Card
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    welcome: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Home;
