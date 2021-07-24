import React from 'react'
import styles from '../styles/Player.module.css'




const Player = () => {
    
    return (
        <>
        <footer className={styles['player-container']}>
        <div className={styles['player-elements']}>
        <div>
            <h2>Song Title</h2>
            <h3>Artist</h3>
        </div>
        <div className={styles['player-controls']}>
        <div>
        <span className={`iconify ${styles['player-skip']}`}data-icon="bi-skip-start-fill" data-inline="false"></span>
        <span className={`iconify ${styles['player-play']}`}data-icon="bi-play-circle-fill" data-inline="false"></span>
        <span className={`iconify ${styles['player-skip']}`}data-icon="bi-skip-end-fill" data-inline="false"></span>
        </div>
        <div>
            
        </div>
        </div>
        <div>
        <span className={`iconify ${styles['sidebar-text']}`}data-icon="bi-volume-down" data-inline="false"></span>
        </div>
        </div>
        </footer>
        
        </>
    )
}

export default Player
