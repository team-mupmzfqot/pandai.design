import React from 'react';
import {
  Card,
  CardHeader,
  AvatarWrapper,
  Avatar,
  StudentName,
  StudentId,
  LabelBadge,
  Divider,
  LessonSection,
  LessonLabel,
  LessonTitle,
  ProgressSection,
  ProgressHeader,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressFill,
  StatsRow,
  StatItem,
  StatValue,
  StatLabel,
} from './StudentProgressCard.styles';

export interface StudentProgressCardProps {
  studentName: string;
  studentId: string;
  avatarSrc?: string;
  avatarInitials?: string;
  lessonTitle: string;
  subject: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  streak: number;
}

const StudentProgressCard: React.FC<StudentProgressCardProps> = ({
  studentName,
  studentId,
  avatarSrc,
  avatarInitials,
  lessonTitle,
  subject,
  progress,
  lessonsCompleted,
  totalLessons,
  streak,
}) => {
  const statusLabel = progress >= 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started';

  return (
    <Card>
      <CardHeader>
        <AvatarWrapper>
          <Avatar src={avatarSrc}>
            {!avatarSrc && (avatarInitials ?? studentName.charAt(0))}
          </Avatar>
          <div>
            <StudentName>{studentName}</StudentName>
            <StudentId>{studentId}</StudentId>
          </div>
        </AvatarWrapper>
        <LabelBadge variant={progress >= 100 ? 'solid' : 'subtle'}>
          {statusLabel}
        </LabelBadge>
      </CardHeader>

      <Divider />

      <LessonSection>
        <LessonLabel>{subject}</LessonLabel>
        <LessonTitle>{lessonTitle}</LessonTitle>
      </LessonSection>

      <ProgressSection>
        <ProgressHeader>
          <ProgressLabel>Lesson Progress</ProgressLabel>
          <ProgressValue>{progress}%</ProgressValue>
        </ProgressHeader>
        <ProgressTrack>
          <ProgressFill value={progress} />
        </ProgressTrack>
      </ProgressSection>

      <StatsRow>
        <StatItem>
          <StatValue>{lessonsCompleted}/{totalLessons}</StatValue>
          <StatLabel>Lessons Done</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{streak} 🔥</StatValue>
          <StatLabel>Day Streak</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{Math.round(progress)}%</StatValue>
          <StatLabel>Completion</StatLabel>
        </StatItem>
      </StatsRow>
    </Card>
  );
};

export default StudentProgressCard;
