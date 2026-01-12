import { ReactNode } from "react"; // Ajout de ReactNode
import Divider from '@mui/material/Divider';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'relative', 
  height: '100%',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'auto',
  width: `calc(${theme.spacing(7)} + 1px)`,
  position: 'relative',
  height: '100%',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  overflowY: 'auto',
  position: 'relative',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    height: '100%',
    '& .MuiDrawer-paper': {
      position: 'relative',
      height: '100%',  
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

// --- Interface pour les props ---
interface ToolBoxProps {
  children?: ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void
}

export default function ToolBox({ children, open, setOpen }: ToolBoxProps) {

  return (
      <Box>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader 
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            {open ? <Typography> Boite à outils </Typography>: <Typography> </Typography>}
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* Conteneur pour les enfants dynamiques */}
          <Box sx={{ 
                alignItems: open ? 'center' : 'left',
              }}>
            {children}
          </Box>
        </Drawer>
      </Box>
  );
}