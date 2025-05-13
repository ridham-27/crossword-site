import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CrosswordBoard from '../components/CrosswordBoard';
import CrosswordSelector from '../components/CrosswordSelector';
import HowToPlayCrossword from '../components/HowToPlayCrossword';
import { ThemeContext } from '../contexts/ThemeContext';
import { CrosswordContext } from '../contexts/CrosswordContext';

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { gameState, startGame, resetGame } = useContext(CrosswordContext);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="container" style={{ backgroundColor: theme.background }}>
      <Head>
        <title>Crossword Challenge</title>
        <meta name="description" content="An interactive crossword puzzle game with customizable themes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="app-layout">
          {/* Main content area */}
          <div className="content-area" style={{ width: '100%' }}>
            <div className="content-header">
              <h1 className="title" style={{ color: theme.text }}>Crossword Challenge</h1>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link href="/preview" style={{ 
                  color: theme.primary,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  display: 'inline-block'
                }}>
                  Theme Settings & Preview
                </Link>
              </div>
            </div>
            
            {/* Start screen */}
            {!gameState.isPlaying && !gameState.gameOver && (
              <div className="start-screen" style={{ backgroundColor: theme.cardBackground }}>
                <div className="profile-section">
                  <div className="profile-avatar" style={{ backgroundColor: theme.primary }}>
                    <span>R</span>
                  </div>
                  <div className="profile-info">
                    <p style={{ color: theme.text }}>@ridhamavaiya</p>
                  </div>
                </div>
                
                <h2 className="subtitle" style={{ color: theme.text }}>Crossword Challenge</h2>
                <p className="description" style={{ color: theme.secondaryText }}>
                  Test your knowledge with this fun, interactive crossword puzzle!
                </p>
                
                <CrosswordSelector />
                
                <button 
                  className="button primary-button" 
                  onClick={startGame}
                  style={{ 
                    backgroundColor: theme.primary,
                    color: theme.buttonText 
                  }}
                >
                  Start Game
                </button>
                
                <button 
                  className="button secondary-button" 
                  onClick={() => setShowHowToPlay(true)}
                  style={{ 
                    backgroundColor: theme.secondary,
                    color: theme.buttonText 
                  }}
                >
                  How to Play
                </button>
                
                <div className="copyright" style={{ color: theme.secondaryText }}>
                  © 2025 Hotly Inc
                </div>
              </div>
            )}
            
            {/* Game board */}
            {gameState.isPlaying && (
              <CrosswordBoard />
            )}
          </div>
        </div>
        
        {/* How to play modal */}
        {showHowToPlay && (
          <HowToPlayCrossword onClose={() => setShowHowToPlay(false)} />
        )}
      </main>
    </div>
  );
}
