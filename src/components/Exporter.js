// Implémenter la logique d'exportation + s'occuper du style !

import * as React from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function Exporter() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: 'absolute',
    top: 40,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    bgcolor: 'background.paper',
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
          <ListItem disablePadding>
            <ListItemButton disabled={false} onClick={handleClick}>
              <ListItemIcon>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText primary="Exporter" />
            </ListItemButton>
          </ListItem>
        {open ? (
            <Stack spacing={2} sx = {styles}>
                <Button>PDF</Button>
                <Button>DOCX</Button>
                <Button>TXT</Button>
            </Stack>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
