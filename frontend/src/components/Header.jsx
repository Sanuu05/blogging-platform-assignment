import { AppBar, Toolbar, Typography, Button, IconButton, Box, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import PostModal from './PostModal';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCreatePost = (postData) => {
    // Handle post creation here
    console.log('Creating post:', postData);
    setPostModalOpen(false);
  };

  const menuItems = [
    { text: 'Posts', path: '/', show: isAuthenticated },
    { text: 'My Posts', path: '/my-posts', show: isAuthenticated },
    { text: 'Login', path: '/login', show: !isAuthenticated },
    { text: 'Register', path: '/register', show: !isAuthenticated },
    { text: 'Logout', show: isAuthenticated },
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: {
          width: '70%',
          maxWidth: '300px',
          backgroundColor: '#ffffff',
          color: '#333333',
          boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <List>
        {isAuthenticated && (
          <ListItem 
            button 
            onClick={() => {
              setPostModalOpen(true);
              handleMobileMenuToggle();
            }}
            sx={{
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ListItemText 
              primary="Add Post" 
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#1976d2',
                }
              }}
            />
          </ListItem>
        )}
        {menuItems.filter((item) => item.show).map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={handleMobileMenuToggle}
            sx={{
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ListItemText 
              primary={item.text} 
              onClick={() => {
                if (item.text === 'Logout') {
                  dispatch(logout());
                } else {
                  navigate(item.path);
                }
              }}
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: item.text === 'Logout' ? 'red' : '#333333',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          width: '100%', 
          left: 0, 
          right: 0,
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ width: '100%', py: 1.5 }}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 600,
                color: '#333333',
                letterSpacing: '-0.5px',
              }}
            >
              Blog Platform
            </Typography>
            
            {isMobile ? (
              <IconButton
                aria-label="menu"
                onClick={handleMobileMenuToggle}
                sx={{
                  color: '#333333',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {isAuthenticated && (
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setPostModalOpen(true)}
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                  >
                    Add Post
                  </Button>
                )}
                {menuItems.filter((item) => item.show).map((item) => (
                  <Button 
                    key={item.text}
                    onClick={() => {
                      if (item.text === 'Logout') {
                        dispatch(logout());
                      } else {
                        navigate(item.path);
                      }
                    }}
                    sx={{
                      color: item.text === 'Logout' ? 'red' : '#333333',
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
        {renderMobileMenu()}
      </AppBar>
      <PostModal
        open={postModalOpen}
        handleClose={() => setPostModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
};

export default Header; 