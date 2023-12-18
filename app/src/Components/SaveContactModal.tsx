import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography, styled } from "@mui/material";
import {  useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Person, Phone } from "@mui/icons-material";
import ContactService, { Contact } from "../Services/ContactService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}


function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            <Box className="flex flex-row items-center justify-between gap-1">
                {children}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 5,
                        top: 5,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
    );
}

export default function SaveContactModal({
    editContact,
    title,
    description,
    dimissCallback,
    confirmCallback,
    open,
}: {
    editContact: Contact | null,
    title: string,
    description?: string,
    dimissCallback: () => void,
    confirmCallback: (data: any) => void,
    open: boolean,
}){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if(editContact){
            setFirstName(editContact.first_name);
            setLastName(editContact.last_name);
            setPhone(editContact.phone_number);
        } else {
            setFirstName('');
            setLastName('');
            setPhone('');
        }
    }, [editContact])

    const handleConfirm = async () => {
        if (firstName && phone) {
            if(editContact?.id){
                return ContactService.updateContact(editContact.id, {
                    id: editContact.id,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                })
                .then(() => {
                    confirmCallback({
                        id: editContact.id,
                        first_name: firstName,
                        last_name: lastName,
                        phone_number: phone,
                    });
                })
                .catch((error) => {
                    console.error('Error updating contact:', error);
                });
            } 
            
            return ContactService.createContact({
                id: null,
                first_name: firstName,
                last_name: lastName,
                phone_number: phone,
            })
                .then(() => {
                    confirmCallback({
                        first_name: firstName,
                        last_name: lastName,
                        phone_number: phone,
                    });
                })
                .catch((error) => {
                    console.error('Error creating contact:', error);
                });
        }
    }

    return (
        <div className={`items-center`}>
            <BootstrapDialog
                onClose={dimissCallback}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={dimissCallback}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {
                        description && (
                            <Typography gutterBottom fontSize={14} marginBottom={2}>
                                {description}
                            </Typography>
                        )
                    }
                    <TextField
                        value={firstName}
                        fullWidth
                        variant="outlined"
                        style={{ backgroundColor: "white", borderRadius: 5 }}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        value={lastName}
                        variant="outlined"
                        style={{ backgroundColor: "white", borderRadius: 5 }}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        value={phone}
                        fullWidth
                        variant="outlined"
                        style={{ backgroundColor: "white", borderRadius: 5 }}
                        placeholder="Phone Number"
                        onChange={(e) => {
                            if (isNaN(Number(e.target.value)) || e.target.value.length > 10) {
                                return;
                            }
                            setPhone(e.target.value)
                        }}
                        InputProps={{

                            startAdornment: (
                                <InputAdornment position="start">
                                    <Phone/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='error' type='submit' variant='contained' className='border border-1 py-1 mt-1 hover:bg-white hover:text-black' onClick={dimissCallback}>
                        {"Cancel"}
                    </Button>
                    <Button color='success' disabled={!firstName || !phone} variant='contained' className='border border-1 py-1 mt-1 hover:bg-white hover:text-black' onClick={handleConfirm}>
                        {"Save"}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}