import React from 'react';
import { Button, Typography, styled, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Composant stylisé pour le bouton du menu basé sur MUI
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.common.white,
  borderRadius: '12px',
  border: '2px solid',
  borderColor: theme.palette.secondary.light,
  padding: theme.spacing(2, 4),
  textTransform: 'none',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  gap: theme.spacing(1),
  width:'100%',
  display:'flex',
  justifyContent:'flex-start',

}));

function ButtonMenu({ title, subTitle, icon: Icon, link, ...props}) {
  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
        <StyledButton {...props}>
            {Icon && <Icon fontSize = "large" color ="primary" />} 
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
                    <Typography variant="h6" component="span">
                        {title}
                    </Typography>
                    <Typography variant="p" component="span">
                        {subTitle}
                    </Typography>
                </Box>
        </StyledButton>
    </Link>
  );
}

export default ButtonMenu;
