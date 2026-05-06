import React from 'react';
import {
  Card,
  AvatarBlock,
  AvatarImage,
  AvatarInitials,
  ContentBlock,
  TitleRow,
  SchoolName,
  SchoolLocation,
  StatsRow,
  StatChip,
  StatIcon,
  StatText,
} from './SchoolHeaderCard.styles';

export interface SchoolHeaderCardProps {
  schoolName: string;
  schoolLocation: string;
  avatarSrc?: string;
  schoolCode: string;
  phoneNumber: string;
  address: string;
}

const SchoolHeaderCard: React.FC<SchoolHeaderCardProps> = ({
  schoolName,
  schoolLocation,
  avatarSrc,
  schoolCode,
  phoneNumber,
  address,
}) => {
  const initials = schoolName
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <Card>
      <AvatarBlock>
        {avatarSrc ? (
          <AvatarImage src={avatarSrc} alt={schoolName} />
        ) : (
          <AvatarInitials>{initials}</AvatarInitials>
        )}
      </AvatarBlock>

      <ContentBlock>
        <div>
          <TitleRow>
            <SchoolName>{schoolName}</SchoolName>
          </TitleRow>
          <SchoolLocation>
            <span>📍</span>
            {schoolLocation}
          </SchoolLocation>
        </div>

        <StatsRow>
          <StatChip>
            <StatIcon>🏫</StatIcon>
            <StatText>Code:</StatText> {schoolCode}
          </StatChip>
          <StatChip>
            <StatIcon>📞</StatIcon>
            <StatText>Tel:</StatText> {phoneNumber}
          </StatChip>
          <StatChip>
            <StatIcon>📌</StatIcon>
            {address}
          </StatChip>
        </StatsRow>
      </ContentBlock>
    </Card>
  );
};

export default SchoolHeaderCard;
