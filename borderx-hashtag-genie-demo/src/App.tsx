import React, { useState, useRef, useEffect } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, TextField, Button, Container, Paper, Chip, IconButton, Card, useTheme, useMediaQuery, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import HashtagBubbles from './components/HashtagBubbles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: isMobile ? 0 : drawerWidth,
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
  position: 'relative',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled('div')<{ isMobile?: boolean }>(({ isMobile }) => ({
  width: isMobile ? '100%' : drawerWidth,
  position: isMobile ? 'relative' : 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#1a1a1a',
  color: '#fff',
  boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  zIndex: 1200,
}));

const ContentCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  backgroundColor: '#fff',
  marginBottom: '30px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '15px',
  marginBottom: '30px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '10px',
  },
}));

const HashtagContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gap: '15px',
  },
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  backgroundColor: '#fff',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  },
}));

const HashtagList = styled(Box)({
  position: 'relative',
  marginTop: '10px',
  height: 'calc(5 * (48px + 8px))', // 5个标签的总高度
  overflow: 'hidden',
});

const ScrollableArea = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'hidden',
  '&:hover': {
    overflowY: 'auto',
  },
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
});

const HashtagItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  marginBottom: '8px',
  borderRadius: '6px',
  backgroundColor: '#f8f9fa',
  transition: 'all 0.2s ease-in-out',
  height: '48px',
  '&:hover': {
    backgroundColor: '#e3f2fd',
  },
});

const RankNumber = styled(Typography)({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  borderRadius: '50%',
  marginRight: '12px',
  fontSize: '0.875rem',
  fontWeight: 600,
});

const FireIcon = styled(LocalFireDepartmentIcon)({
  color: '#ff6b6b',
  marginLeft: '8px',
  fontSize: '1.2rem',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    height: '48px',
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
  },
});

const GenerateButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: '8px 20px',
  textTransform: 'none',
  fontWeight: 600,
  height: '48px',
  boxShadow: '0 2px 4px rgba(25,118,210,0.2)',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  '&:hover': {
    boxShadow: '0 4px 8px rgba(25,118,210,0.3)',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    position: 'fixed',
    top: '10px',
    left: '10px',
    zIndex: 1300,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333',
    },
  },
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1300,
  padding: '8px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  transition: 'all 0.3s ease-in-out',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: '#666',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
}));

const HashtagCategory = ({ title, tags }: { title: string; tags: string[] }) => {
  return (
    <CategoryCard>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
        {title}
      </Typography>
      <HashtagList>
        <ScrollableArea>
          {tags.map((tag, index) => (
            <HashtagItem key={tag}>
              <RankNumber>{index + 1}</RankNumber>
              <Typography>{tag}</Typography>
              {index < 3 && <FireIcon />}
            </HashtagItem>
          ))}
        </ScrollableArea>
      </HashtagList>
    </CategoryCard>
  );
};

function App() {
  const [searchText, setSearchText] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // 示例 hashtag 数据
  const hashtagCategories = {
    fashion: ['#fashion', '#style', '#ootd', '#fashionblogger', '#streetstyle', '#fashionista', '#fashionstyle', '#fashionaddict', '#fashiondiaries', '#fashiongram'],
    food: ['#food', '#foodie', '#foodphotography', '#instafood', '#yummy', '#foodporn', '#foodstagram', '#foodlover', '#foodblogger', '#foodgasm'],
    travel: ['#travel', '#travelgram', '#traveling', '#wanderlust', '#travelphotography', '#travelblogger', '#travelingram', '#traveladdict', '#travelpics', '#traveling'],
  };

  const handleToggle = () => {
    setIsContentVisible(!isContentVisible);
    setIsTop(!isTop);
  };

  return (
    <ThemeProvider>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* 移动端菜单按钮 */}
        {isMobile && (
          <MobileMenuButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <MenuIcon />
          </MobileMenuButton>
        )}

        {/* 左侧菜单栏 */}
        {(!isMobile || isDrawerOpen) && (
          <Drawer isMobile={isMobile}>
            <Toolbar sx={{ height: '80px' }}>
              <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 600 }}>
                BorderX
              </Typography>
            </Toolbar>
          </Drawer>
        )}

        {/* 主要内容区域 */}
        <Main isMobile={isMobile} sx={{ position: 'relative' }}>
          <ToggleButton
            onClick={handleToggle}
            sx={{
              top: isTop ? '20px' : 'calc(100vh - 60px)',
              transition: 'top 0.3s ease-in-out',
            }}
          >
            {isTop ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </ToggleButton>

          <ContentWrapper
            sx={{
              maxHeight: '100%',
              opacity: 1,
              marginTop: '60px',
              transform: 'translateY(0)',
              visibility: 'visible',
            }}
          >
            {isContentVisible ? (
              <ContentCard ref={cardRef}>
                {/* 搜索区域 */}
                <SearchContainer>
                  <StyledTextField
                    fullWidth
                    variant="outlined"
                    placeholder="输入搜索内容..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: '#666', mr: 1 }} />,
                    }}
                  />
                  <GenerateButton
                    variant="contained"
                    color="primary"
                    startIcon={<AutoAwesomeIcon />}
                  >
                    Generate
                  </GenerateButton>
                </SearchContainer>

                {/* Hashtag 分类展示区 */}
                <HashtagContainer>
                  <HashtagCategory title="Fashion Hashtags" tags={hashtagCategories.fashion} />
                  <HashtagCategory title="Food Hashtags" tags={hashtagCategories.food} />
                  <HashtagCategory title="Travel Hashtags" tags={hashtagCategories.travel} />
                </HashtagContainer>
              </ContentCard>
            ) : (
              <Box
                sx={{
                  minHeight: '100vh',
                  background: 'linear-gradient(135deg, #f6f8fc 0%, #e9ecef 100%)',
                  '.dark &': {
                    background: 'linear-gradient(135deg, #1a1c20 0%, #2d3748 100%)',
                  },
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Header />
                <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                    <CategoryFilter />
                    <HashtagBubbles />
                  </Box>
                </Container>
              </Box>
            )}
          </ContentWrapper>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
