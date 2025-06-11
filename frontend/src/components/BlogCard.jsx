import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const BlogCard = ({ 
  post, 
  onEdit, 
  onDelete, 
  isAuthor = false 
}) => {
  const navigate = useNavigate();
  const { title, content, author, createdAt, _id } = post;

  // Truncate content for preview
  const truncatedContent = content.length > 150 
    ? `${content.substring(0, 150)}...` 
    : content;

  const handleReadMore = () => {
    navigate(`/posts/${_id}`);
  };

  return (
    <Card 
      sx={{ 
        mb: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              mr: 2,
            }}
          >
            {author?.name?.charAt(0) || 'A'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {author?.name || 'Anonymous'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            mb: 2,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>

        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            lineHeight: 1.6,
          }}
        >
          {truncatedContent}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label="Blog" 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button 
          size="small" 
          color="primary"
          onClick={handleReadMore}
        >
          Read More
        </Button>

        {isAuthor && (
          <Box>
            <IconButton 
              size="small" 
              color="primary"
              onClick={() => onEdit(post)}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              size="small" 
              color="error"
              onClick={() => onDelete(_id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default BlogCard; 