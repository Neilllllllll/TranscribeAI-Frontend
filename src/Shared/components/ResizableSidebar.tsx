import { ReactNode } from "react";
import { Box, Divider, Typography, IconButton, styled } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const defaultExpandedWidth = 240; // Largeur par défaut quand ouvert
const defaultCollapsedWidth = 64;  // Largeur par défaut quand fermé

// Styled Box pour le panneau latéral
const StyledSidebarContainer = styled(Box, { 
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'side' && prop !== 'expandedWidth' && prop !== 'collapsedWidth' 
})<{ 
  open: boolean; 
  side: "left" | "right"; 
  expandedWidth: number; 
  collapsedWidth: number;
}>(({ theme, open, side, expandedWidth, collapsedWidth }) => ({
  width: open ? expandedWidth : collapsedWidth,
  height: '100%', // Prend toute la hauteur disponible du parent Flex
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  // Bordures pour le séparer visuellement
  borderLeft: side === "right" ? `1px solid ${theme.palette.divider}` : 'none',
  borderRight: side === "left" ? `1px solid ${theme.palette.divider}` : 'none',
  overflowX: 'hidden', // Cache le contenu horizontalement quand fermé
  flexShrink: 0,       // Empêche le panneau de s'écraser si le contenu principal est grand
  // L'ordre n'est pas nécessaire ici car il est géré par l'ordre du JSX dans le parent Flex

  // On cible tous les ListItemText n'importe où à l'intérieur
  '& .MuiListItemText-root': {
    opacity: open ? 1 : 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    // Optionnel : empêcher le texte de prendre de la place quand fermé
    display: open ? 'block' : 'none', 
  },
}));

interface ResizableSidebarProps {
  children?: ReactNode;
  open: boolean;
  onToggle: () => void; // Fonction pour basculer l'état ouvert/fermé
  side?: "left" | "right"; // Positionnement par rapport au contenu principal
  title?: string; // Titre affiché
  expandedWidth?: number; // Largeur en mode ouvert (par défaut 240px)
  collapsedWidth?: number; // Largeur en mode fermé (par défaut 64px)
}

export default function ResizableSidebar({
  children,
  open,
  onToggle,
  side = "right", // Par défaut, il se met à droite
  title = "Panneau latéral",
  expandedWidth = defaultExpandedWidth,
  collapsedWidth = defaultCollapsedWidth,
}: ResizableSidebarProps) {

  // Déterminer l'icône appropriée pour le basculement
  const ToggleIcon = side === "left" 
    ? (open ? ChevronLeftIcon : ChevronRightIcon) 
    : (open ? ChevronRightIcon : ChevronLeftIcon);

  return (
    <StyledSidebarContainer
      open={open}
      side={side}
      expandedWidth={expandedWidth}
      collapsedWidth={collapsedWidth}
    >
      {/* Header */}
      <Box sx={{ 
        p: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: open ? 'space-between' : 'center',
      }}>
        {
          side === "right" ? (
            <>
              <IconButton onClick={onToggle}>
                <ToggleIcon />
              </IconButton>
              {open && <Typography variant="subtitle2" noWrap sx={{ ml: 1 }}>{title}</Typography>}
            </>
          ) : (
            <>
              {open && <Typography variant="subtitle2" noWrap sx={{ ml: 1 }}>{title}</Typography>}
              <IconButton onClick={onToggle}>
                <ToggleIcon />
              </IconButton>
            </>
          )
        }
      </Box>
      
      <Divider />
      {/* Main */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        // On centre toujours horizontalement pour que les icônes restent au milieu
        alignItems: 'center',           
        width: '100%',
        overflowY: 'auto', 
        overflowX: 'hidden',
        flexGrow: 1,
        '& > *': {
        // On force chaque enfant à ne pas dépasser la largeur de la sidebar
        width: '100%',
        flexShrink: 0
      }
      }}>
        {children}
      </Box>
    </StyledSidebarContainer>
  );
}