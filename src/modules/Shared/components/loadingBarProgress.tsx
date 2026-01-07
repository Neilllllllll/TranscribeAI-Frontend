/* Component displaying a loading bar with progress percentage */
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function LoadingBarProgress() {
  return (
    <Box sx={{ width: '60%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress />
        </Box>
        <Box sx={{ minWidth: 35 }}>
        </Box>
      </Box>
    </Box>
  );
}