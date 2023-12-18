import React, { useEffect, useState } from 'react';
import ContactService, { Contact } from '../Services/ContactService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactBook, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Phone from '@mui/icons-material/Phone';
import SaveContactModal from '../Components/SaveContactModal';
import DeleteConfirmationModal from '../Components/DeleteModal';
import { toast } from 'react-toastify';

const ContactList: React.FC = () => {
    
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [search, setSearch] = useState<string>('');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSaveContactModal, setShowSaveContactModal] = useState(false);


    function handleConfirmDelete(id: number | null) {
        if(!id) return;
        ContactService.deleteContact(id).then(() => {
            refreshList();
            toast.success("Contact deleted successfully!")
        })
        setShowDeleteModal(false);
    };

    function refreshList() {
        console.log(search)
        ContactService.getAllContacts(search).then((data) => {
            setContacts(data)
        })
    }

    useEffect(() => {
        refreshList();
    }, [])

    return (
        <div style={{ padding: "10px" }}>
            <h1><FontAwesomeIcon icon={faContactBook} /> Phone Book App</h1>
            <div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h2>Contacts</h2>
                    <IconButton
                        sx={{
                            color: "white",
                            borderRadius: 1,
                            fontSize: 18,
                            padding: "15px",
                            fontWeight: "bold",
                            backgroundColor: '#347bf6',
                            '&:hover': {
                                backgroundColor: 'blue',
                            }
                        }}
                        onClick={() => {
                            setSelectedContact(null);
                            setShowSaveContactModal(true);
                        }}
                    >
                        <FontAwesomeIcon size="sm" style={{ marginRight: 5 }} color="white" icon={faPlus} />Add Contact
                    </IconButton>
                </div>
                <TextField
                    fullWidth
                    variant="outlined"
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    placeholder="Search for contact by last name..."
                    onChange={(e) => {
                        setSearch(e.target.value)
                        ContactService.getAllContacts(e.target.value).then((data) => {
                            setContacts(data)
                        })
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {contacts && contacts.map((contact: Contact) => (
                        <div key={contact.id} style={{ display: 'flex', justifyContent: 'space-between', border: "1px solid #e2e2e2", backgroundColor: "white", padding: "15px" }}>
                            <div style={{ textAlign: "start" }}>
                                <span style={{ fontSize: "25px", display: "block" }}>{contact.first_name + " " + contact.last_name}</span>
                                <div style={{ marginTop: '10px' }}>
                                    <Phone style={{ color: "grey", fontSize: "16px" }} />
                                    <span style={{ color: "grey" }} > {contact.phone_number}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: "start" }}>
                                <IconButton 
                                    sx={{
                                        color: "#CB444A",
                                        borderRadius: 2,
                                        fontSize: 18,
                                        padding: "15px",
                                        marginRight: "10px",
                                        fontWeight: "bold",
                                        backgroundColor: '#D86700',
                                        '&:hover': {
                                            backgroundColor: '#D14900',
                                        }
                                    }}
                                    onClick={() => {
                                        setSelectedContact(contact)
                                        setShowSaveContactModal(true);
                                    }}
                                >
                                    <FontAwesomeIcon size="sm" style={{ marginRight: 5 }} color="white" icon={faEdit} />
                                </IconButton>
                                <IconButton
                                    sx={{
                                        color: "#CB444A",
                                        borderRadius: 2,
                                        fontSize: 18,
                                        padding: "15px",
                                        fontWeight: "bold",
                                        backgroundColor: '#CB444A',
                                        '&:hover': {
                                            backgroundColor: '#CB0000',
                                        }
                                    }}
                                    onClick={() => {
                                        setSelectedContact(contact)
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    <FontAwesomeIcon size="sm" style={{ marginRight: 5 }} color="white" icon={faTrash} />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <DeleteConfirmationModal
                open={showDeleteModal}
                dimissCallback={() => {
                    setShowDeleteModal(false);
                }}
                confirmCallback={() => handleConfirmDelete(selectedContact?.id ?? null)}
            />
            <SaveContactModal
                editContact={selectedContact}
                title={selectedContact?.id ? 'Edit Contact' : 'Add Contact'}
                description='Enter contact information below.'
                open={showSaveContactModal}
                confirmCallback={(data) => {
                    setShowSaveContactModal(false)
                    refreshList();
                }}
                dimissCallback={() => {
                    setShowSaveContactModal(false)
                }}
            />
        </div>
    );
};

export default ContactList;
