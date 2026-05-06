import styled from 'styled-components';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export const Card = styled.div`
  background: ${colors.pink[50]};
  border-radius: 16px;
  border: 1.5px solid ${colors.pink[200]};
  padding: ${spacing.xlarge};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xlarge};
  width: 100%;
  max-width: 720px;
  font-family: ${typography.fontFamilies.primary};
  box-shadow: 0 2px 12px rgba(255, 92, 152, 0.08), 0 1px 4px rgba(0,0,0,0.05);
`;

export const AvatarBlock = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 14px;
  background-color: ${colors.pink[100]};
  border: 2.5px solid ${colors.pink[400]};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarInitials = styled.span`
  font-size: ${typography.fontSizes.xlarge};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.pink[600]};
`;

export const ContentBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.medium};
  flex-wrap: wrap;
`;

export const SchoolName = styled.h2`
  margin: 0;
  font-size: ${typography.fontSizes.xlarge};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.pink[800]};
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SchoolLocation = styled.p`
  margin: 0;
  font-size: ${typography.fontSizes.medium};
  color: ${colors.pink[600]};
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 2px;
`;

export const StatChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: ${colors.pink[100]};
  border: 1px solid ${colors.pink[200]};
  border-radius: 8px;
  padding: 5px 12px;
  font-size: ${typography.fontSizes.small};
  color: ${colors.pink[700]};
  white-space: nowrap;
`;

export const StatIcon = styled.span`
  font-size: 14px;
  line-height: 1;
`;

export const StatText = styled.span`
  font-weight: ${typography.fontWeights.medium};
`;

export const StatDivider = styled.span`
  color: ${colors.pink[300]};
  margin: 0 2px;
`;
