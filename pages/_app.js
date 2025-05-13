import { useState, useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { CrosswordProvider } from '../contexts/CrosswordContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Use hydration safe rendering approach
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ThemeProvider>
      <CrosswordProvider>
        <Component {...pageProps} />
      </CrosswordProvider>
    </ThemeProvider>
  );
}

export default MyApp;
