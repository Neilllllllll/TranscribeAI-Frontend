import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  onDelete: () => void;
}

export default function DeleteButton({ onDelete }: Props) {
  return (
    <IconButton color="error" aria-label="delete" onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  );
}