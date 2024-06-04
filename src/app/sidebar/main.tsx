"use client"

import React from 'react';
import { logo } from '@/assets';

const MainContent: React.FC = () => {
    return (
        <div className="main-content">
            <header>
                <img src={logo.src} alt="Hoomanlabs Logo" />
            </header>
            <section className="content-section bg-white">
                <h1>Intro Message</h1>
                <p>This is Hooman, your virtual assistant from Hoomanlabs. How can I help you today?</p>
            </section>
        </div>
    );
};

export default MainContent;
