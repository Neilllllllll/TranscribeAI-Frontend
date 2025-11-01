import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SpeedDial from './SpeedDial';
import theme from "../Theme"

 function Header({ title, logo }) {
  return (
    <Box
    sx={{
    width: '100%', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background : theme.palette.background.paper,
    p: 2,
    color: theme.palette.text
    }}>
      {/* Section gauche : logo et titre */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {logo && (<img src={logo} alt="" style={{ height: 60, width: 60, borderRadius: '50%' }}/>)}
        <Typography variant="h1" component="h2">{title}</Typography>
      </Box>
      {/* Section droite : bouton SpeedDial */}
      <SpeedDial />
    </Box>
  );
}
export default Header;
