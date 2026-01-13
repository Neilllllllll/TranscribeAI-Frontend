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
import { FileExporter } from "../utils/TexteExporter.tsx";
import { useAlert } from '../contexts/AlertContext.tsx';

interface ExporterProps {
  textToExport: string | null;
}

export default function Exporter({textToExport}: ExporterProps) {
  const {showAlert} = useAlert();
  
  const exporter = new FileExporter();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const checkTextToExport = () => {
    if(textToExport === null || textToExport === "") {
      showAlert("Impossible d'exporter un texte vide.", "error");
      return false;
    }
    return true;
  }

  const handlerExportToDocx  = async () => {
    if(!checkTextToExport()) return;
    showAlert("Exportation vers DOCX en cours...", "info");
    await exporter.exportDocx("mon_document", textToExport ?? null);
    showAlert("Exportation vers DOCX terminée.", "success");
  }

  const handlerExportToPdf  = () => {
    if(!checkTextToExport()) return;
    showAlert("Exportation vers PDF en cours...", "info");
    exporter.exportPdf("mon_document", textToExport ?? null);
    showAlert("Exportation vers PDF terminée.", "success");
  }

  const handlerExportToTxt  = async () => {
    if(!checkTextToExport()) return;
    showAlert("Exportation vers TXT en cours...", "info");
    exporter.exportTxt("mon_document", textToExport ?? null);
    showAlert("Exportation vers TXT terminée.", "success");
  }

  return (
    <>
      <ListItemButton onClick={handleClick} disabled={textToExport === null || textToExport === "" || false}>
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
