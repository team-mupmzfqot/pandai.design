import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
}

const StyledButton = styled.button<{ variant: string; disabled: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ variant, disabled }) => {
    if (disabled) {
      return `
        background-color: grey;
        cursor: not-allowed;
      `;
    }
    switch (variant) {
      case 'primary':
        return `
          background-color: blue;
          color: white;
          &:hover {
            background-color: darkblue;
          }
        `;
      case 'secondary':
        return `
          background-color: lightgrey;
          color: black;
          &:hover {
            background-color: grey;
          }
        `;
      case 'tertiary':
        return `
          background-color: transparent;
          color: blue;
          &:hover {
            background-color: lightblue;
          }
        `;
      default:
        return `
          background-color: blue;
          color: white;
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', disabled = false }) => {
  return (
    <StyledButton onClick={onClick} variant={variant} disabled={disabled}>
      {label}
    </StyledButton>
  );
};

export default Button;