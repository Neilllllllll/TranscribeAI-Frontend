/* Componente for exporting text to different file formats */
// Import react hooks
import { useState } from 'react';
// Import components from material UI
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// Import icons from material UI
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import NotesIcon from '@mui/icons-material/Notes';
import IosShareIcon from '@mui/icons-material/IosShare';
// Import our exporter utility
import { FileExporter } from "../utils/TexteExporter";
import { AlertState } from "../types/alert.types.ts";
import { TranscriptionText } from "../types/transcriptionText.types.ts";

interface ExporterProps {
  transcriptionText: TranscriptionText;
  setAlert: (alert: AlertState) => void;
}

export default function Exporter({transcriptionText, setAlert}: ExporterProps) {
  
  const exporter = new FileExporter();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handlerExportToDocx  = async () => {
    setAlert({alert: "Exportation vers DOCX en cours...", alertType: "info"});
    await exporter.exportDocx("mon_document", texteToExport);
    setAlert({alert: "Exportation vers DOCX terminée.", alertType: "success"});
  }

  const handlerExportToPdf  = () => {
    setAlert({alert: "Exportation vers PDF en cours...", alertType: "info"});
    exporter.exportPdf("mon_document", texteToExport);
    setAlert({alert: "Exportation vers PDF terminée.", alertType: "success"});
  }

  const handlerExportToTxt  = async () => {
    setAlert({alert: "Exportation vers TXT en cours...", alertType: "info"});
    exporter.exportTxt("mon_document", texteToExport);
    setAlert({alert: "Exportation vers TXT terminée.", alertType: "success"});
  }

  return (
    <>
      <ListItemButton onClick={handleClick} disabled = {true}>
        <ListItemIcon>
          <IosShareIcon />
        </ListItemIcon>
        <ListItemText primary="Exporter" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handlerExportToDocx}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="DOCX" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}  onClick={handlerExportToPdf}>
            <ListItemIcon>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary="PDF" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}  onClick={handlerExportToTxt}>
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText primary="TXT" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
