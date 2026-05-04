import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryDarker};
  }

  &.secondary {
    background-color: ${({ theme }) => theme.colors.secondary};
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.secondaryDarker};
    }
  }

  &.disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export default Button;