import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 8px;
`;

export const CardContent = styled.p`
  font-size: 1rem;
  color: #333;
`;