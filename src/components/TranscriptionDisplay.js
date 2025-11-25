/* Component that display the transcribed text */
/* 
A faire : 
Faire une affichage conditionnel du CircularProgressWithLabel en fonction de l'état de la retranscription

Réflechir à la question du : est ce que on fait l'appel API dans ce composant ou dans le parent et on passe le texte en props ? : 
// Cas 1 : on fait l'appel API ici : et on passe le blob audio en props
// Cas 2 : on fait l'appel API dans le parent et on passe le texte en props
Je pense que le mieux est le cas 2, car comme ça on sépare bien les responsabilités des composants.

Faire un affichage animer du texte qui s'affiche au fur et à mesure de la retranscription (genre un effet machine à écrire)

Mettre un effet de scroll automatique vers le bas quand le texte s'allonge

Mettre un bouton pour copier le texte dans le presse papier

Pouvoir changer une chaine de caractère dans le texte et cela pour tout le texte (genre corriger une faute de retranscription)

Indiquer en fonction de la position de lecture de l'audio quelle partie du texte est en train d'être lue (genre surligner la phrase en cours de lecture)

Faire d'afficher des timestamps cliquables dans le texte pour aller à un moment précis de l'audio

Gérer le cas où y'a pas de texte retranscrit (genre afficher un message "Rien n'a été retranscrit pour l'instant") ?

*/

import CircularProgress from '@mui/material/CircularProgress';

import Box from "@mui/material/Box";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function TranscriptionDisplay({transcription, progress}) {
    return(
        <>
            <Box sx = {{ width: '100%'}}>
                <CircularProgress value={progress} />
                <TextareaAutosize
                    minRows={3}
                    maxRows={80}
                    style={{width: '100%'}}>     
                    {transcription ? transcription : "Rien n'a été retranscrit pour l'instant"}
                </TextareaAutosize>
            </Box>
        </>
    );
};