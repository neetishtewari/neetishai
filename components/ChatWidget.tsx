'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import styles from './ChatWidget.module.css';

const SUGGESTED_QUESTIONS = [
    "What is Neetish's expertise?",
    "Tell me about Auto-Feedback",
    "How can you help my startup?",
];

export default function ChatWidget() {
    // Expecting useChat to return { messages, sendMessage, error... }
    const { messages, sendMessage, error } = useChat() as any;
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSuggestionClick = (question: string) => {
        // Send message directly
        sendMessage({ role: 'user', content: question });
    };

    const handleInternalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        sendMessage({ role: 'user', content: input });
        setInput('');
    };

    return (
        <div className={styles.chatContainer}>
            {isOpen && (
                <div className={styles.window}>
                    <div className={styles.header}>
                        <h3>Ask Neetish</h3>
                        <button onClick={toggleOpen} className={styles.closeButton}>×</button>
                    </div>

                    <div className={styles.messages}>
                        {error && (
                            <div className={styles.message} style={{ color: 'red', background: 'rgba(255,0,0,0.1)' }}>
                                <strong>Error:</strong> {error.message || 'Something went wrong'}
                            </div>
                        )}
                        {messages.length === 0 && !error && (
                            <div style={{ padding: '0 0.5rem', opacity: 0.8 }}>
                                <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    Hi! I'm Neetish's AI assistant. Ask me anything about his work, projects, or experience.
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {SUGGESTED_QUESTIONS.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSuggestionClick(q)}
                                            style={{
                                                background: 'rgba(255,255,255,0.1)',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                borderRadius: '16px',
                                                padding: '0.4rem 0.8rem',
                                                color: 'var(--foreground)',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((m: any) => (
                            <div key={m.id} className={`${styles.message} ${m.role === 'user' ? styles.userMessage : styles.aiMessage}`}>
                                <strong>{m.role === 'user' ? 'You' : 'Neetish AI'}:</strong> {m.content}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleInternalSubmit} className={styles.form}>
                        <input
                            className={styles.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                        />
                        <button type="submit" className={styles.sendButton} disabled={!input.trim()}>
                            Send
                        </button>
                    </form>
                </div>
            )}

            <button onClick={toggleOpen} className={styles.toggleButton} aria-label="Chat with Neetish AI">
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                )}
            </button>
        </div>
    );
}
