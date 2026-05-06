import React from 'react';
import './Card.styles.ts';

interface CardProps {
    title: string;
    content: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, content, className }) => {
    return (
        <div className={`card ${className}`}>
            <h2 className="card-title">{title}</h2>
            <div className="card-content">{content}</div>
        </div>
    );
};

export default Card;