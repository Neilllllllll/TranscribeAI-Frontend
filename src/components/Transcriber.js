import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import TextareaAutosize from '@mui/material/TextareaAutosize';
/*
Composant qui affiche une retranscription d'un audio
Props : 
{audioSource} -> chemin vers l'audio utilisé dans la balise audio afin de permettre à l'utilisateur de lire l'audio
*/
export default function Transcriber({audioSource}){
    return(
        <Box sx = {{
            display :'flex',
            alignItems : "center",
            justifyContent : "center",
            flexDirection: "column",
            gap : '10px'
        }}>
            <Box sx = {{ width: '100%'}}>
                <TextareaAutosize
                minRows={3}
                maxRows={80}
                style={{width: '100%'}}>     
                Rien n'a été retranscrit pour l'instant
                </TextareaAutosize>

            </Box>
            <Divider/>
            <audio style={{ width: '80%' }} controls src={audioSource}></audio>
        </Box>
    );
};