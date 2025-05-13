import { useState, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ThemeContext } from '../contexts/ThemeContext';
import { themes } from '../styles/Theme';

const Preview = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState('Default');
  
  const handleThemeChange = (themeName) => {
    setTheme(themes[themeName]);
    setSelectedTheme(themeName);
  };
  
  return (
    <div className="container" style={{ backgroundColor: theme.background }}>
      <Head>
        <title>Crossword Challenge Preview</title>
        <meta name="description" content="Preview of all screens in the crossword game" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      <div className="app-layout preview-layout">
        {/* Left sidebar with themes */}
        <div className="sidebar preview-sidebar" style={{ backgroundColor: theme.cardBackground }}>
          <h2 className="sidebar-title" style={{ color: theme.text }}>Themes</h2>
          <div className="themes-list">
            {Object.keys(themes).map((themeName) => (
              <div 
                key={themeName}
                className={`theme-option ${selectedTheme === themeName ? 'active' : ''}`}
                onClick={() => handleThemeChange(themeName)}
                style={{ 
                  borderColor: selectedTheme === themeName ? theme.primary : 'transparent',
                  backgroundColor: selectedTheme === themeName ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                <span className="theme-name" style={{ color: theme.text }}>{themeName}</span>
                <div className="color-palette">
                  {['primary', 'secondary', 'accent', 'success', 'error', 'warning'].map((colorKey) => (
                    <div 
                      key={colorKey}
                      className="color-circle"
                      style={{ backgroundColor: themes[themeName][colorKey] }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="content-area">
          <div className="preview-header" style={{ color: theme.text }}>
            <h1>Crossword Challenge Preview</h1>
            <p style={{ marginBottom: '20px', color: theme.secondaryText }}>
              This page shows all screens with the selected theme
            </p>
            
            <Link href="/" style={{ 
              display: 'inline-block', 
              color: theme.buttonText,
              backgroundColor: theme.primary,
              padding: '10px 15px',
              borderRadius: '5px',
              textDecoration: 'none'
            }}>
              Back to Game
            </Link>
          </div>
          
          <div className="preview-screens">
            {/* Start Screen */}
            <div className="preview-screen">
              <h2 style={{ color: theme.text, marginBottom: '15px' }}>Start Screen</h2>
              <div className="screen-content" style={{ backgroundColor: theme.cardBackground, padding: '20px', borderRadius: '10px' }}>
                <div className="profile-section">
                  <div className="profile-avatar" style={{ backgroundColor: theme.primary }}>
                    <span>R</span>
                  </div>
                  <div className="profile-info">
                    <p style={{ color: theme.text }}>@ridhamavaiya</p>
                  </div>
                </div>
                
                <h2 className="subtitle" style={{ color: theme.text }}>Crossword Challenge</h2>
                <p style={{ color: theme.secondaryText, marginBottom: '20px' }}>
                  Test your knowledge with this fun, interactive crossword puzzle!
                </p>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
                  <div style={{ 
                    padding: '10px 15px', 
                    borderRadius: '8px',
                    border: `2px solid ${theme.primary}`,
                    color: theme.text
                  }}>
                    <span style={{ display: 'block', marginBottom: '5px' }}>India-Pakistan Trivia</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>10x10</span>
                  </div>
                  
                  <div style={{ 
                    padding: '10px 15px', 
                    borderRadius: '8px',
                    border: `2px solid ${theme.primary}`,
                    color: theme.text,
                    backgroundColor: theme.secondary
                  }}>
                    <span style={{ display: 'block', marginBottom: '5px' }}>Geography & History</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>10x10</span>
                  </div>
                </div>
                
                <button style={{ 
                  backgroundColor: theme.primary,
                  color: theme.buttonText,
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '500',
                  margin: '10px 0',
                  width: '100%',
                  maxWidth: '250px'
                }}>
                  Start Game
                </button>
                
                <button style={{ 
                  backgroundColor: theme.secondary,
                  color: theme.buttonText,
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '500',
                  margin: '10px 0',
                  width: '100%',
                  maxWidth: '250px'
                }}>
                  How to Play
                </button>
              </div>
            </div>
            
            {/* Play Screen */}
            <div className="preview-screen">
              <h2 style={{ color: theme.text, marginBottom: '15px' }}>Game Screen</h2>
              <div className="screen-content" style={{ backgroundColor: theme.cardBackground, padding: '20px', borderRadius: '10px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '20px',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  padding: '10px',
                  borderRadius: '10px'
                }}>
                  <div style={{ color: theme.success, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      backgroundColor: 'currentColor', 
                      display: 'inline-block' 
                    }}></span>
                    <span>2</span>
                    <span style={{ color: theme.text }}>/</span>
                    <span style={{ color: theme.text }}>8</span>
                    <span style={{ color: theme.secondaryText }}> words</span>
                  </div>
                  
                  <div style={{ color: theme.success, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      backgroundColor: 'currentColor', 
                      display: 'inline-block' 
                    }}></span>
                    <span>09:45</span>
                  </div>
                  
                  <div style={{ color: theme.warning, fontWeight: '600' }}>
                    <span>2</span>
                    <span style={{ color: theme.secondaryText }}> hints</span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  {/* Simplified grid representation */}
                  <div style={{ 
                    aspectRatio: '1/1',
                    maxWidth: '300px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gridTemplateRows: 'repeat(5, 1fr)',
                    gap: '2px',
                    margin: '0 auto 20px',
                    border: `2px solid ${theme.text}`
                  }}>
                    {Array(25).fill().map((_, i) => {
                      const row = Math.floor(i / 5);
                      const col = i % 5;
                      
                      // Create some pattern of active/inactive cells
                      const isActive = !((row === 0 && col === 0) || 
                                        (row === 4 && col === 4) || 
                                        (row === 0 && col === 4) || 
                                        (row === 4 && col === 0) ||
                                        (row === 2 && col === 2));
                      
                      // Create some highlighted cells to simulate selection
                      const isSelected = (row === 1 && col === 1);
                      const isInSelectedWord = (row === 1 && (col >= 1 && col <= 3));
                      
                      let backgroundColor = isActive ? theme.cardBackground : theme.background;
                      if (isSelected) backgroundColor = theme.primary;
                      else if (isInSelectedWord) backgroundColor = theme.secondary;
                      
                      return (
                        <div key={i} style={{ 
                          backgroundColor,
                          border: isActive ? `1px solid ${theme.text}` : 'none',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'relative'
                        }}>
                          {isActive && (row === 1 && col === 1) && (
                            <div style={{ 
                              position: 'absolute',
                              top: '2px',
                              left: '2px',
                              fontSize: '0.6rem',
                              color: theme.secondaryText
                            }}>3</div>
                          )}
                          
                          {isActive && isInSelectedWord && (
                            <div style={{ 
                              fontSize: '1rem',
                              fontWeight: '600',
                              color: isSelected ? theme.buttonText : theme.text
                            }}>
                              {['', 'C', 'A', 'T', ''][col]}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Clues */}
                  <div style={{ 
                    border: `1px solid rgba(0,0,0,0.1)`,
                    borderRadius: '10px',
                    padding: '15px'
                  }}>
                    {/* Across clues */}
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ 
                        color: theme.text,
                        marginBottom: '15px',
                        paddingBottom: '5px',
                        borderBottom: `1px solid ${theme.text}`
                      }}>Across</h3>
                      
                      <ul style={{ listStyle: 'none' }}>
                        <li style={{ 
                          padding: '8px 12px',
                          marginBottom: '8px',
                          color: theme.text
                        }}>
                          <span style={{ fontWeight: '600', marginRight: '5px' }}>1.</span> River that flows through India
                        </li>
                        <li style={{ 
                          padding: '8px 12px',
                          marginBottom: '8px',
                          color: theme.text,
                          backgroundColor: theme.secondary,
                          borderRadius: '5px'
                        }}>
                          <span style={{ fontWeight: '600', marginRight: '5px' }}>3.</span> Small feline animal
                        </li>
                        <li style={{ 
                          padding: '8px 12px',
                          marginBottom: '8px',
                          color: theme.success,
                          textDecoration: 'line-through'
                        }}>
                          <span style={{ fontWeight: '600', marginRight: '5px' }}>5.</span> Capital of France
                        </li>
                      </ul>
                    </div>
                    
                    {/* Down clues */}
                    <div>
                      <h3 style={{ 
                        color: theme.text,
                        marginBottom: '15px',
                        paddingBottom: '5px',
                        borderBottom: `1px solid ${theme.text}`
                      }}>Down</h3>
                      
                      <ul style={{ listStyle: 'none' }}>
                        <li style={{ 
                          padding: '8px 12px',
                          marginBottom: '8px',
                          color: theme.text
                        }}>
                          <span style={{ fontWeight: '600', marginRight: '5px' }}>1.</span> Tree with needles
                        </li>
                        <li style={{ 
                          padding: '8px 12px',
                          marginBottom: '8px',
                          color: theme.text
                        }}>
                          <span style={{ fontWeight: '600', marginRight: '5px' }}>2.</span> Bright light in the sky
                        </li>
                        <li style={{ 
                          padding: '8px 12px',
                          marginBottom: '8px',
                          color: theme.text
                        }}>
                          <span style={{ fontWeight: '600', marginRight: '5px' }}>4.</span> Place to swim
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  justifyContent: 'center'
                }}>
                  <button style={{ 
                    backgroundColor: theme.secondary,
                    color: theme.buttonText,
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    Toggle Direction
                  </button>
                  
                  <button style={{ 
                    backgroundColor: theme.warning,
                    color: theme.buttonText,
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    Use Hint (2)
                  </button>
                  
                  <button style={{ 
                    backgroundColor: theme.error,
                    color: theme.buttonText,
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    Reset Puzzle
                  </button>
                </div>
              </div>
            </div>
            
            {/* Result Screen */}
            <div className="preview-screen">
              <h2 style={{ color: theme.text, marginBottom: '15px' }}>Result Screen</h2>
              <div className="screen-content" style={{ backgroundColor: theme.cardBackground, padding: '20px', borderRadius: '10px' }}>
                <div style={{ 
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: theme.success,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg viewBox="0 0 24 24" width="48" height="48" stroke={theme.buttonText} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 15l8.385-8.415a2.1 2.1 0 0 0 0-2.97 2.1 2.1 0 0 0-2.97 0L9 12l-7.415-7.415a2.1 2.1 0 0 0-2.97 0 2.1 2.1 0 0 0 0 2.97L7.03 15.97a2.1 2.1 0 0 0 2.97 0L12 15z"></path>
                  </svg>
                </div>
                
                <h2 style={{ color: theme.text, marginBottom: '10px' }}>Game Over!</h2>
                
                <p style={{ color: theme.secondaryText, marginBottom: '20px' }}>
                  Congratulations! You've solved the puzzle.
                </p>
                
                <div style={{ 
                  display: 'flex',
                  gap: '20px',
                  margin: '20px 0',
                  justifyContent: 'center'
                }}>
                  <div style={{ 
                    backgroundColor: theme.secondary,
                    padding: '20px',
                    borderRadius: '10px',
                    minWidth: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: theme.buttonText }}>Time</span>
                    <span style={{ 
                      color: theme.buttonText,
                      fontSize: '2rem',
                      fontWeight: '700'
                    }}>07:23</span>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: theme.success,
                    padding: '20px',
                    borderRadius: '10px',
                    minWidth: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: theme.buttonText }}>Hints Used</span>
                    <span style={{ 
                      color: theme.buttonText,
                      fontSize: '2rem',
                      fontWeight: '700'
                    }}>1/3</span>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: theme.primary,
                  color: theme.buttonText,
                  width: '100%',
                  padding: '15px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  India-Pakistan Trivia
                </div>
                
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: '100%',
                  maxWidth: '300px',
                  margin: '0 auto'
                }}>
                  <button style={{ 
                    backgroundColor: theme.primary,
                    color: theme.buttonText,
                    padding: '12px',
                    border: 'none',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10"></polyline>
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                    </svg>
                    Play Again
                  </button>
                  
                  <button style={{ 
                    backgroundColor: theme.success,
                    color: theme.buttonText,
                    padding: '12px',
                    border: 'none',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Home
                  </button>
                  
                  <button style={{ 
                    backgroundColor: theme.error,
                    color: theme.buttonText,
                    padding: '12px',
                    border: 'none',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    Share Score
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .preview-layout {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
        }
        
        .preview-sidebar {
          width: 240px;
          min-width: 240px;
          height: 100vh;
          overflow-y: auto;
          border-right: 1px solid rgba(255,255,255,0.1);
          padding: 20px 10px;
        }
        
        .preview-screens {
          display: flex;
          flex-direction: row;
          gap: 20px;
          overflow-x: auto;
          padding: 10px 5px 20px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scroll-snap-type: x mandatory;
          margin-top: 10px;
        }
        
        .preview-screen {
          flex: 0 0 85%;
          display: flex;
          flex-direction: column;
          scroll-snap-align: center;
          max-width: 400px;
        }
        
        .screen-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 500px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border-radius: 15px;
          overflow: hidden;
        }
        
        /* Custom scrollbar for webkit browsers */
        .preview-screens::-webkit-scrollbar {
          height: 6px;
        }
        
        .preview-screens::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        
        .preview-screens::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
        }
        
        .preview-header {
          text-align: center;
          margin-bottom: 20px;
          padding: 0 10px;
        }
        
        .themes-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          padding-right: 5px;
          margin-top: 15px;
        }
        
        .theme-option {
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .theme-option:hover {
          background-color: rgba(255,255,255,0.05);
        }
        
        .theme-name {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .color-palette {
          display: flex;
          gap: 5px;
        }
        
        .color-circle {
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }
        
        @media (min-width: 1200px) {
          .preview-screens {
            justify-content: center;
            padding: 20px;
          }
          
          .preview-screen {
            flex: 0 0 400px;
          }
        }
        
        @media (max-width: 991px) {
          .preview-layout {
            flex-direction: column;
          }
          
          .preview-sidebar {
            width: 100%;
            min-width: 100%;
            height: auto;
            max-height: 160px;
            overflow-y: hidden;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 15px 10px;
          }
          
          .themes-list {
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            max-height: none;
            padding-bottom: 10px;
            margin-top: 10px;
          }
          
          .theme-option {
            min-width: 180px;
            flex-shrink: 0;
          }
        }
        
        @media (max-width: 600px) {
          .preview-screen {
            flex: 0 0 90%;
          }
          
          .screen-content {
            min-height: 450px;
          }
          
          .preview-sidebar {
            max-height: 140px;
            padding: 10px;
          }
          
          .sidebar-title {
            font-size: 1.2rem;
            margin-bottom: 5px;
          }
          
          .theme-option {
            min-width: 160px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Preview;