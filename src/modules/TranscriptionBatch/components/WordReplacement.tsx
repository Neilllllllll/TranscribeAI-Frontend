import { Button, TextField, Stack, Typography, InputAdornment } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

interface WordReplacementProps {
  onReplace: (search: string, replace: string) => void;
}

export default function WordReplacement({onReplace}: WordReplacementProps) {

  const [searchValue, setSearchValue] = useState("");
  const [replaceValue, setReplaceValue] = useState("");

  const handleClick = () => {
    if (searchValue.trim()) {
        onReplace(searchValue, replaceValue);
    }
  };

  return (
    <Stack spacing={2} sx={{ p: 1, width: '100%' }}>
      <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
        <SyncAltIcon fontSize="small" /> Correction globale
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Chercher"
        variant="outlined"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='chat jipiti'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        size="small"
        label="Remplacer par"
        variant="outlined"
        onChange={(e) => setReplaceValue(e.target.value)}
        placeholder='Chat GPT'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CachedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Button 
        variant="contained" 
        fullWidth 
        onClick={handleClick}
        startIcon={<SyncAltIcon />}
        sx={{ mt: 1, borderRadius: 2, py: 1 }}
      >
        Tout remplacer
      </Button>
    </Stack>
  );
}