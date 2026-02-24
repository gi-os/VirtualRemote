import { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

const langColors: Record<string, string> = {
  bash: 'var(--accent-green)',
  json: 'var(--accent-yellow)',
  javascript: 'var(--accent-orange)',
  typescript: 'var(--accent-blue)',
  yaml: 'var(--accent-purple)',
};

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prismLang = language === 'bash' ? 'bash'
    : language === 'json' ? 'json'
    : language === 'yaml' ? 'yaml'
    : language === 'typescript' ? 'typescript'
    : 'javascript';

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.35)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 'var(--glass-radius-sm)',
      overflow: 'hidden',
      marginTop: 'var(--space-md)',
      marginBottom: 'var(--space-md)',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.03)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Traffic light dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          {title && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              {title}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '0.7rem',
            color: langColors[language] || 'var(--text-tertiary)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255,255,255,0.08)',
              border: '1px solid',
              borderColor: copied ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255,255,255,0.12)',
              borderRadius: 'var(--glass-radius-pill)',
              padding: '4px 12px',
              color: copied ? 'var(--accent-green)' : 'var(--text-secondary)',
              fontSize: '0.72rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      {/* Code area */}
      <pre style={{
        margin: 0,
        padding: '16px 20px',
        overflow: 'auto',
        fontSize: '0.85rem',
        lineHeight: 1.65,
        fontFamily: 'var(--font-mono)',
        background: 'transparent',
      }}>
        <code ref={codeRef} className={`language-${prismLang}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
