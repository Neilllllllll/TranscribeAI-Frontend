/* Component CopyButton.tsx: Button to copy text to clipboard */

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { AlertState } from '../types/alert.types.ts';

type CopyButtonProps = {
  /** Text to copy */
  textToCopy: string | null;
  /** Duration of the feedback display (ms) */
  duration?: number;
  /** Icon size */
  size?: 'small' | 'medium' | 'large';

  setAlert: (alert: AlertState) => void;
};
export default function CopyButton({textToCopy, duration = 1500, size = 'small', setAlert}: CopyButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if(textToCopy=== "" || textToCopy === null) {
      setAlert({alert: "Impossible de copier un texte vide.", alertType: "error"});
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
    } catch {
      console.error('Impossible de copier le texte.');
    }
  };

  return (
    <>
      <Tooltip title={copied ? 'Copié !' : 'Copier'}>
        <IconButton
          onClick={handleCopy}
          color={copied ? 'success' : 'default'}
          size={size}
        >
          {copied ? <CheckIcon /> : <ContentCopyIcon />}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={copied}
        message="Texte copié dans le presse-papier"
        autoHideDuration={duration}
      />
    </>
  );
};