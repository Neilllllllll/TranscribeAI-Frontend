// Reçoit un fichier audio en props et appelle l'API pour la retrnascription
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import TextareaAutosize from '@mui/material/TextareaAutosize';


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