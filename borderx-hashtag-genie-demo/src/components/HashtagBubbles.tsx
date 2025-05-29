import React from 'react';
import { Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';

// 示例数据，实际应用中应该从API获取
const trendingHashtags = [
  { id: 1, tag: 'Technology', count: 1234 },
  { id: 2, tag: 'Innovation', count: 987 },
  { id: 3, tag: 'Design', count: 856 },
  { id: 4, tag: 'Programming', count: 754 },
  { id: 5, tag: 'AI', count: 652 },
  { id: 6, tag: 'Future', count: 543 },
  { id: 7, tag: 'Startup', count: 432 },
  { id: 8, tag: 'Digital', count: 321 },
];

const MotionChip = motion(Chip);

const HashtagBubbles: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'center',
        p: 2,
      }}
    >
      {trendingHashtags.map((hashtag, index) => (
        <MotionChip
          key={hashtag.id}
          label={`#${hashtag.tag}`}
          onClick={() => {}}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
          sx={{
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              transform: 'scale(1.05)',
            },
            transition: 'transform 0.2s ease-in-out',
            cursor: 'pointer',
            fontWeight: 500,
            px: 2,
            py: 1,
          }}
        />
      ))}
    </Box>
  );
};

export default HashtagBubbles; 