import React from 'react'
import styles from '../styles/Player.module.css'




const Player = () => {
    
    return (
        <>
        <footer className={styles['player-container']}>
        <div className={styles['player-elements']}>
        <div>
            <h2 className={styles['song-title']}>Song Title</h2>
            <h3 className={styles['artist']}>Artist</h3>
        </div>
        <div className={styles['player-controls']}>
        <div className={styles['player-controls-main']}>
        <span className={`iconify ${styles['player-skip']}`}data-icon="bi-skip-start-fill" data-inline="false"></span>
        <span className={`iconify ${styles['player-play']}`}data-icon="bi-play-circle-fill" data-inline="false"></span>
        <span className={`iconify ${styles['player-skip']}`}data-icon="bi-skip-end-fill" data-inline="false"></span>
        </div>
        <div className={styles['player-controls-bar']}>
            <p className={`iconify ${styles['player-time']}`}>0:00</p>
            <input type="range" min="1" max="100" className={styles['slider']} id="myRange"></input>
            <p className={`iconify ${styles['player-time']}`}>4:20</p>
        </div>
        </div>
        <div className={styles['player-sound-controls']}>
        <span className={`iconify ${styles['player-sound']}`}data-icon="bi-volume-down" data-inline="false"></span>
        <input type="range" min="1" max="100" className={styles['sound-slider']} id="soundRange"></input>
        </div>
        </div>
        </footer>
        
        </>
    )
}

export default Player
