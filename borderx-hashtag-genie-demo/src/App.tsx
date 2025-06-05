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
import { motion } from 'framer-motion';

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

const BubbleContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'calc(100% - 240px)',
  height: 'calc(100vh - 200px)',
  overflow: 'hidden',
  marginLeft: '240px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
  },
}));

const Bubble = styled(motion(Paper))(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(2),
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  minWidth: '120px',
  minHeight: '120px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const BubbleContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  textAlign: 'center',
  fontSize: '1.1rem',
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  position: 'relative',
  zIndex: 1,
  '& h1': {
    fontSize: '3rem',
    fontWeight: 700,
    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: theme.spacing(2),
  },
  '& p': {
    color: theme.palette.text.secondary,
    fontSize: '1.2rem',
  },
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
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const [bubblePositions, setBubblePositions] = useState<Array<{x: number, y: number, size: number}>>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const bubbleContainerRef = useRef<HTMLDivElement>(null);

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

  // 生成不重叠的随机位置
  const generateBubblePositions = (count: number) => {
    if (!bubbleContainerRef.current) return [];
    
    const containerRect = bubbleContainerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width || 800; // 提供默认值
    const containerHeight = containerRect.height || 600;
    
    const positions: Array<{x: number, y: number, size: number}> = [];
    const minDistance = 80; // 增加最小距离，确保不重叠
    const maxAttempts = 500; // 增加尝试次数
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 80 + 160; // 160-240px，扩大一倍
      let attempts = 0;
      let validPosition = false;
      let x = 0, y = 0;
      
      while (!validPosition && attempts < maxAttempts) {
        // 中心点稍微往左上偏移
        const centerOffsetX = -containerWidth * 0.1; // 向左偏移10%
        const centerOffsetY = -containerHeight * 0.1; // 向上偏移10%
        
        // 在偏移后的中心点周围生成位置
        const adjustedCenterX = containerWidth / 2 + centerOffsetX;
        const adjustedCenterY = containerHeight / 2 + centerOffsetY;
        
        // 生成围绕调整后中心点的随机位置
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * Math.min(containerWidth, containerHeight) * 0.35;
        
        x = adjustedCenterX + radius * Math.cos(angle) - size / 2;
        y = adjustedCenterY + radius * Math.sin(angle) - size / 2;
        
        // 确保气泡完全在容器内，留出更多边距
        const margin = 30;
        x = Math.max(margin, Math.min(x, containerWidth - size - margin));
        y = Math.max(margin, Math.min(y, containerHeight - size - margin));
        
        // 检查是否与已有气泡重叠 - 更严格的碰撞检测
        validPosition = true;
        for (const pos of positions) {
          const centerX1 = x + size / 2;
          const centerY1 = y + size / 2;
          const centerX2 = pos.x + pos.size / 2;
          const centerY2 = pos.y + pos.size / 2;
          
          const distance = Math.sqrt(
            Math.pow(centerX1 - centerX2, 2) + Math.pow(centerY1 - centerY2, 2)
          );
          
          // 确保两个气泡的边缘之间有足够距离
          const minRequiredDistance = (size + pos.size) / 2 + minDistance;
          
          if (distance < minRequiredDistance) {
            validPosition = false;
            break;
          }
        }
        attempts++;
      }
      
      // 如果找不到不重叠的位置，使用改进的网格布局作为后备
      if (!validPosition) {
        // 计算合适的网格尺寸
        const maxBubbleSize = 240;
        const gridSpacing = maxBubbleSize + minDistance;
        const cols = Math.floor(containerWidth / gridSpacing);
        const rows = Math.ceil(count / cols);
        
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        // 居中网格布局
        const totalGridWidth = cols * gridSpacing;
        const totalGridHeight = rows * gridSpacing;
        const startX = (containerWidth - totalGridWidth) / 2;
        const startY = (containerHeight - totalGridHeight) / 2;
        
        x = startX + col * gridSpacing + gridSpacing / 2 - size / 2;
        y = startY + row * gridSpacing + gridSpacing / 2 - size / 2;
        
        // 添加小幅随机偏移，但确保不会造成重叠
        const maxOffset = Math.min(30, (gridSpacing - size) / 2 - 10);
        x += (Math.random() - 0.5) * maxOffset;
        y += (Math.random() - 0.5) * maxOffset;
        
        // 确保不超出边界
        const margin = 30;
        x = Math.max(margin, Math.min(x, containerWidth - size - margin));
        y = Math.max(margin, Math.min(y, containerHeight - size - margin));
      }
      
      positions.push({ x, y, size });
    }
    
    return positions;
  };

  // 当容器引用变化或组件首次加载时生成位置
  useEffect(() => {
    const timer = setTimeout(() => {
      const positions = generateBubblePositions(7); // 减少到约1/3的数量
      setBubblePositions(positions);
    }, 100); // 延迟确保容器已渲染
    
    return () => clearTimeout(timer);
  }, [bubbleContainerRef.current, isContentVisible]);

  // 监听窗口大小变化，重新生成位置
  useEffect(() => {
    const handleResize = () => {
      const positions = generateBubblePositions(7); // 减少到约1/3的数量
      setBubblePositions(positions);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // 热门标签数据
  const trendingTags = [
    { text: '#FashionWeek', category: 'fashion' },
    { text: '#FoodieLife', category: 'food' },
    { text: '#TravelGram', category: 'travel' },
    { text: '#TechNews', category: 'tech' },
    { text: '#FitnessGoals', category: 'fitness' },
    { text: '#ArtGallery', category: 'art' },
    { text: '#MusicFest', category: 'music' },
    { text: '#NatureLovers', category: 'nature' },
    { text: '#FoodPorn', category: 'food' },
    { text: '#StreetStyle', category: 'fashion' },
    { text: '#Wanderlust', category: 'travel' },
    { text: '#GamingLife', category: 'gaming' },
    { text: '#Photography', category: 'photo' },
    { text: '#BeautyTips', category: 'beauty' },
    { text: '#HomeDecor', category: 'lifestyle' },
    { text: '#PetLife', category: 'pets' },
    { text: '#FitnessMotivation', category: 'fitness' },
    { text: '#TravelPhotography', category: 'travel' },
    { text: '#FoodBlogger', category: 'food' },
    { text: '#FashionInspiration', category: 'fashion' },
  ];

  return (
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
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transform: isContentVisible ? 'translateY(0)' : 'translateY(-100%)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
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
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transform: isContentVisible ? 'translateY(100%)' : 'translateY(0)',
              transition: 'transform 0.3s ease-in-out',
              background: 'linear-gradient(135deg, #f6f8fc 0%, #e9ecef 100%)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
              <TitleContainer>
                <Typography variant="h1">Hashtag Genie</Typography>
                <Typography>Discover trending hashtags in real-time</Typography>
              </TitleContainer>
              
              <BubbleContainer ref={bubbleContainerRef}>
                {trendingTags.slice(0, 7).map((tag, index) => { // 减少到7个气泡
                  const position = bubblePositions[index];
                  if (!position) return null;
                  
                  return (
                    <Bubble
                      key={tag.text}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ scale: 1.1 }}
                      style={{
                        width: position.size,
                        height: position.size,
                        left: position.x,
                        top: position.y,
                      }}
                    >
                      <BubbleContent>{tag.text}</BubbleContent>
                    </Bubble>
                  );
                })}
              </BubbleContainer>
            </Box>
          </Box>
        </ContentWrapper>
      </Main>
    </Box>
  );
}

export default App;