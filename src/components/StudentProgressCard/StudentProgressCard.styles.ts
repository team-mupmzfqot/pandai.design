import styled from 'styled-components';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 204, 133, 0.10), 0 1px 4px rgba(0,0,0,0.06);
  padding: ${spacing.xlarge};
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.large};
  font-family: ${typography.fontFamilies.primary};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.medium};
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div<{ src?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${colors.ogGreen[100]};
  border: 2.5px solid ${colors.ogGreen[500]};
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.fontSizes.medium};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.ogGreen[700]};
  flex-shrink: 0;
`;

export const StudentName = styled.p`
  margin: 0;
  font-size: ${typography.fontSizes.medium};
  font-weight: ${typography.fontWeights.bold};
  color: #1a1a1a;
  line-height: 1.3;
`;

export const StudentId = styled.p`
  margin: 0;
  font-size: ${typography.fontSizes.small};
  color: ${colors.gray[600]};
  line-height: 1.4;
`;

export const LabelBadge = styled.span<{ variant?: 'solid' | 'subtle' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: ${typography.fontSizes.small};
  font-weight: ${typography.fontWeights.medium};
  white-space: nowrap;
  background-color: ${({ variant }) =>
    variant === 'subtle' ? colors.ogGreen[100] : colors.ogGreen[500]};
  color: ${({ variant }) =>
    variant === 'subtle' ? colors.ogGreen[700] : colors.white};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.ogGreen[100]};
  margin: 0;
`;

export const LessonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LessonLabel = styled.p`
  margin: 0;
  font-size: ${typography.fontSizes.small};
  color: ${colors.gray[600]};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const LessonTitle = styled.p`
  margin: 0;
  font-size: ${typography.fontSizes.medium};
  font-weight: ${typography.fontWeights.bold};
  color: #1a1a1a;
  line-height: 1.4;
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressLabel = styled.span`
  font-size: ${typography.fontSizes.small};
  color: ${colors.gray[600]};
`;

export const ProgressValue = styled.span`
  font-size: ${typography.fontSizes.small};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.ogGreen[600]};
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${colors.ogGreen[100]};
  border-radius: 99px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ value: number }>`
  height: 100%;
  width: ${({ value }) => `${Math.min(100, Math.max(0, value))}%`};
  background-color: ${colors.ogGreen[500]};
  border-radius: 99px;
  transition: width 0.4s ease;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: ${spacing.medium};
`;

export const StatItem = styled.div`
  flex: 1;
  background: ${colors.ogGreen[50]};
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StatValue = styled.p`
  margin: 0;
  font-size: ${typography.fontSizes.medium};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.ogGreen[700]};
`;

export const StatLabel = styled.p`
  margin: 0;
  font-size: ${typography.fontSizes.small};
  color: ${colors.gray[600]};
`;
