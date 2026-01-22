import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Contact = () => {
    const form = useRef();
    const [isSending, setIsSending] = useState(false);

    // Environment variables for EmailJS
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        const params = {
            name: form.current.user_name.value,
            email: form.current.user_email.value,
            title: form.current.subject.value,
            message: form.current.message.value,
            time: new Date().toLocaleString()
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)
            .then((result) => {
                form.current.reset();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Message Sent Successfully!',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1f1f',
                    color: '#ffffff'
                });
                setIsSending(false);
            }, (error) => {
                console.error(error);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed to send message.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1f1f',
                    color: '#ffffff'
                });
                setIsSending(false);
            });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="section-title fade-in-up">Get In <span className="highlight">Touch</span></h2>
                <div className="contact-content fade-in-up delay-100 glass">
                    <form ref={form} className="contact-form" id="contact-form" onSubmit={sendEmail}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="user_name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="user_email" placeholder="your@email.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" placeholder="Let's build something amazing..." required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary glow-effect" disabled={isSending}>
                            {isSending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <div className="social-links fade-in-up delay-200">
                    <a href="https://www.linkedin.com/in/harsh27vardhan" target="_blank" className="social-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" className="social-img" />
                    </a>
                    <a href="https://www.github.com/harsh27vardhan" target="_blank" className="social-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/640px-Octicons-mark-github.svg.png" alt="GitHub" className="social-img" />
                    </a>
                    <a href="https://www.instagram.com/_harsh27vardhan" target="_blank" className="social-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="social-img" />
                    </a>
                    <a href="mailto:reachvardhanharsh9@gmail.com" target="_blank" className="social-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="social-img" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
