import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material";
import React from "react";
type Props = {
    open: boolean;
    title: string;
    content: string;
    handleClose: (decision: boolean) => void
}
const Confirm: React.FC<Props> = ({ open, title, content, handleClose }) => {
    return <Box>
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>Cancel</Button>
                <Button onClick={() => handleClose(true)} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    </Box>

}
export default Confirm