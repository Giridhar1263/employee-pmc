import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationAction = (props) => {
    // const dispatch = useDispatch();

    const { actionOpen, edit, confirmAction, setActionOpen, setEdit } = props;
    // setActionOpen, confirmAction,

    return (
        <React.Fragment>
            <Dialog
                open={actionOpen}
                fullWidth
                maxWidth='sm'
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle align='center'>
                    <Typography
                        sx={{
                            // textDecoration: 'underline',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontFamily: 'Raleway',
                            color: "#767676",
                            fontWeight: "600",
                            border: "none",
                            "&:hover": {
                                color: "#767676",
                                border: "none",
                            },
                            "&:focus": {
                                color: "#767676",
                                border: "none",
                            },
                        }}
                    >
                        Do you want to delete !
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        sx={{
                            textTransform: 'none',
                            borderRadius: 15,
                            fontSize: '13px',
                            fontFamily: 'Raleway',
                            fontWeight: '600',
                        }}
                        onClick={() => { setEdit({}); setActionOpen(false); }}
                    >
                        Cancel
                    </Button>&ensp;
                    <Button
                        variant='contained'
                        color='error'
                        size='small'
                        sx={{
                            textTransform: 'none',
                            borderRadius: 15,
                            fontSize: '13px',
                            fontFamily: 'Raleway',
                            fontWeight: '600',
                        }}
                        onClick={() => confirmAction(edit)}
                    >
                        Delete
                    </Button>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
ConfirmationAction.propTypes = {
    actionOpen: PropTypes.any,
    setActionOpen: PropTypes.any,
    confirmAction: PropTypes.any,
    id: PropTypes.any,
    setEdit: PropTypes.any
};
export default React.memo(ConfirmationAction)