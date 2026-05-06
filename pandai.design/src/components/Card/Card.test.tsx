import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  const title = 'Test Card Title';
  const content = 'This is a test card content.';

  test('renders the Card component with title and content', () => {
    render(<Card title={title} content={content} />);
    
    const titleElement = screen.getByText(title);
    const contentElement = screen.getByText(content);
    
    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  test('applies custom styles', () => {
    const customStyle = { backgroundColor: 'lightblue' };
    render(<Card title={title} content={content} style={customStyle} />);
    
    const cardElement = screen.getByText(content).parentElement;
    expect(cardElement).toHaveStyle('background-color: lightblue');
  });
});