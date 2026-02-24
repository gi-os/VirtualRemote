import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './sections/Overview';
import Authentication from './sections/Authentication';
import Discovery from './sections/Discovery';
import EndpointReference from './sections/EndpointReference';
import SendingCommands from './sections/SendingCommands';
import WebSocketAPI from './sections/WebSocketAPI';
import ButtonLayout from './sections/ButtonLayout';
import CorsProxy from './sections/CorsProxy';
import Simulator from './sections/Simulator';
import CommunityProjects from './sections/CommunityProjects';
import { sections } from './data/sections';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Fade-in sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activeSection={activeSection} />

      <main style={{
        marginLeft: 'var(--sidebar-width)',
        flex: 1,
        padding: 'var(--space-3xl) var(--space-xl) var(--space-3xl) var(--space-2xl)',
        maxWidth: 'calc(var(--content-max-width) + var(--space-3xl))',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
          <div className="fade-in-section is-visible">
            <Overview />
          </div>
          <div className="fade-in-section">
            <Authentication />
          </div>
          <div className="fade-in-section">
            <Discovery />
          </div>
          <div className="fade-in-section">
            <EndpointReference />
          </div>
          <div className="fade-in-section">
            <SendingCommands />
          </div>
          <div className="fade-in-section">
            <WebSocketAPI />
          </div>
          <div className="fade-in-section">
            <ButtonLayout />
          </div>
          <div className="fade-in-section">
            <CorsProxy />
          </div>
          <div className="fade-in-section">
            <Simulator />
          </div>
          <div className="fade-in-section">
            <CommunityProjects />
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: 'var(--space-3xl)',
          padding: 'var(--space-xl) 0',
          borderTop: '1px solid var(--glass-border)',
          fontSize: '0.82rem',
          color: 'var(--text-tertiary)',
          textAlign: 'center',
        }}>
          <p style={{ color: 'var(--text-tertiary)' }}>
            Built for the{' '}
            <a href="https://www.unfoldedcircle.com" target="_blank" rel="noopener noreferrer">
              Unfolded Circle
            </a>{' '}
            Remote 3 · API v0.10.0-beta ·{' '}
            <a href="https://github.com/unfoldedcircle/core-api" target="_blank" rel="noopener noreferrer">
              core-api
            </a>{' '}
            ·{' '}
            <a href="https://unfoldedcircle.github.io/core-api/" target="_blank" rel="noopener noreferrer">
              Developer Guide
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
