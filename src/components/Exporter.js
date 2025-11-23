import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import NotesIcon from '@mui/icons-material/Notes';
import IosShareIcon from '@mui/icons-material/IosShare';
import { FileExporter } from "../utils/TexteExporter";
import ListSubheader from '@mui/material/ListSubheader';

export default function NestedList({texteToExport}) {
  
  const exporter = new FileExporter();

  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const exportToDocx  = async () => {
    await exporter.exportDocx("mon_document", texteToExport);
  }

  const exportToPdf  = () => {
    exporter.exportPdf("mon_document", texteToExport);
  }

  const exportToTxt  = async () => {
    exporter.exportTxt("mon_document", texteToExport);
  }

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Options d'exportation
        </ListSubheader>}
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <IosShareIcon />
        </ListItemIcon>
        <ListItemText primary="Exporter" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={exportToDocx}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="DOCX" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}  onClick={exportToPdf}>
            <ListItemIcon>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary="PDF" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}  onClick={exportToTxt}>
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText primary="TXT" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
