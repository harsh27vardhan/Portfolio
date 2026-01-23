import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Harsh's virtual assistant. Ask me anything about his skills, projects, or experience!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [chatState, setChatState] = useState('IDLE'); // IDLE, AWAITING_NAME, AWAITING_EMAIL
    const [userInfo, setUserInfo] = useState({ query: '', name: '', email: '' });
    const messagesEndRef = useRef(null);

    // Knowledge Base
    const knowledgeBase = {
        greetings: ['hi', 'hello', 'hey', 'greetings'],
        skills: ['skill', 'stack', 'technology', 'technologies', 'language', 'framework', 'tool'],
        experience: ['experience', 'job', 'work', 'company', 'companies', 'intern', 'internship'],
        projects: ['project', 'work', 'portfolio', 'app', 'website'],
        contact: ['contact', 'email', 'reach', 'number', 'phone'],
        about: ['about', 'who', 'harsh', 'self'],
    };

    const responses = {
        greetings: "Hello! How can I help you today?",
        skills: "I am proficient in C++, Python, HTML, CSS, JavaScript, and SQL. I work with frameworks like React, Node.js, Express, and tools like Git, Docker, and Jenkins.",
        experience: "I have experience working as a Senior Frontend Engineer at Enaviya, a QA Intern at Cognizant, and a Web Developer Intern at Explorin.",
        projects: "I've worked on several projects including MLB Career Analytics, YouTube Comment Analyzer, and a Rental App 'Book It Up'. You can view them in the Projects section!",
        contact: "You can reach me at reachvardhanharsh9@gmail.com or via the contact form on this site.",
        about: "I'm Harsh Vardhan, a Full Stack Developer and Automation Tester passionate about building digital experiences.",
        default: "I don't have information on that specific topic. Would you like me to forward your query to Harsh?"
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const processMessage = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput('');

        // Helper to add bot message
        const reply = (text) => {
            setTimeout(() => {
                setMessages(prev => [...prev, { text, sender: 'bot' }]);
            }, 500);
        };

        if (chatState === 'AWAITING_NAME') {
            setUserInfo(prev => ({ ...prev, name: userMsg }));
            reply(`Thanks ${userMsg}. What is your email address so I can respond to you?`);
            setChatState('AWAITING_EMAIL');
            return;
        }

        if (chatState === 'AWAITING_EMAIL') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userMsg)) {
                reply("That doesn't look like a valid email. Please try again.");
                return;
            }
            setUserInfo(prev => ({ ...prev, email: userMsg }));
            reply("Perfect. Sending your query to Harsh...");

            // Send Email
            sendQueryEmail(userInfo.name, userMsg, userInfo.query);
            return;
        }

        // Normal Flow
        const lowerInput = userMsg.toLowerCase();
        let matchFound = false;

        for (const [category, keywords] of Object.entries(knowledgeBase)) {
            if (keywords.some(k => lowerInput.includes(k))) {
                reply(responses[category]);
                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            setUserInfo(prev => ({ ...prev, query: userMsg }));
            reply("I'm not sure about that particular detail. May I ask your name so I can forward this request to Harsh?");
            setChatState('AWAITING_NAME');
        }
    };

    const sendQueryEmail = (name, email, query) => {
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

        const params = {
            name: name,
            email: email,
            title: 'query-portfolio',
            message: `User Query: ${query}\n\n(Generated via Chatbot)`,
            time: new Date().toLocaleString()
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)
            .then(() => {
                setTimeout(() => {
                    setMessages(prev => [...prev, { text: "Your query has been sent! Harsh will get back to you via email soon.", sender: 'bot' }]);
                }, 1000);
                setChatState('IDLE');
                setUserInfo({ query: '', name: '', email: '' });
            })
            .catch((err) => {
                console.error("EmailJS Error:", err);
                setTimeout(() => {
                    setMessages(prev => [...prev, { text: "I'm having trouble connecting right now. Please try the contact form instead.", sender: 'bot' }]);
                }, 1000);
                setChatState('IDLE');
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            processMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            { text: "Hi! I'm Harsh's virtual assistant. Ask me anything about his skills, projects, or experience!", sender: 'bot' }
        ]);
        setChatState('IDLE');
        setUserInfo({ query: '', name: '', email: '' });
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window glass">
                    <div className="chatbot-header">
                        <h3>Ask Bot</h3>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button onClick={clearChat} className="reset-btn" title="Clear Chat">
                                <i className="fa-solid fa-rotate-right"></i>
                            </button>
                            <button onClick={toggleChat} className="close-btn">&times;</button>
                        </div>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={processMessage}><i className="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
            )}
            <button className="chatbot-toggle-btn glow-effect" onClick={toggleChat}>
                <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
            </button>
        </div>
    );
};

export default Chatbot;
