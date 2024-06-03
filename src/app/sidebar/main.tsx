"use client"

import React from 'react';

const MainContent: React.FC = () => {
    return (
        <div className="main-content">
            <header>
                <img src="/path_to_logo.png" alt="Hoomanlabs Logo" />
            </header>
            <section className="content-section bg-white">
                <h1>Intro Message</h1>
                <p>This is Hooman, your virtual assistant from Hoomanlabs. How can I help you today?</p>
            </section>
        </div>
    );
};

export default MainContent;
