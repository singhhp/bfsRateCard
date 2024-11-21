// components/Navbar.js
import React from 'react';
import { useRouter } from 'next/navigation';  
const Navbar = ({ onCarrierChange }) => {
        
    const router = useRouter();  

 
    const goToHome = () => {
        router.push('/');  
    };

         
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>Rate Card Generator</h1>
            <div style={styles.buttonGroup}>
            <button onClick={goToHome} style={styles.homeButton}>
                    Home
                </button>
                {['FedEx', 'UPS', 'DHL'].map((carrier) => (
                    <button 
                        key={carrier} 
                        onClick={() => onCarrierChange(carrier)} 
                        style={styles.button}
                    >
                        {carrier}
                    </button>
                ))}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    title: {
        margin: 0,
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '5px 10px',
        backgroundColor: '#555',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    }
};

export default Navbar;
