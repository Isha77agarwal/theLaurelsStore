import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typewriter from 'typewriter-effect';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SearchBar = ({ open, handleClose, width }) => {
    const wrapValue = width === 'xs' ? "wrap" : "noWrap";

    return (
        <div>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}
                keepMounted maxWidth={width} fullWidth={true} scroll="body"
                PaperProps={{ sx: { verticalAlign: "top" } }}>
                <DialogTitle sx={{ fontWeight: 600, color: '#333652', letterSpacing: '0.25rem', fontSize: 35 }}>
                    <Typewriter
                        options={{
                            strings: ['SEARCH'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexWrap: wrapValue, justifyContent: 'space-between' }}>
                    <TextField
                        focused
                        margin="dense"
                        id="search"
                        fullWidth
                        variant="standard"
                        color="secondary" inputProps={{
                            sx: { height: 30, fontSize: 25 }
                        }}
                        sx={{ marginRight: '15px', flex: 'auto' }}
                    />
                    <Button variant="outlined" color='secondary' sx={{
                        borderRadius: 10, width: '18%', height: '30%', border: '3px solid', fontSize: '90%', fontWeight: 600, marginRight: '15px', flex: 'auto', ':hover': {
                            backgroundColor: 'secondary.dark',
                            color: '#ffffff',
                            transition: '.5s ease'
                        }
                    }}>GO</Button>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default SearchBar