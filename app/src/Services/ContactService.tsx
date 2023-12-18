import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/contacts';

export interface Contact {
    id: number | null;
    first_name: string;
    last_name: string;
    phone_number: string;
}

class ContactService {
    getAllContacts(lastName: string): Promise<Contact[]> {
        return axios.get(API_URL + (lastName ? `?last_name=${lastName}` : ''))
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching contacts:', error);
                throw error;
            });
    }

    getContactById(id: number): Promise<Contact> {
        return axios.get(`${API_URL}/${id}`)
            .then(response => response.data[0])
            .catch(error => {
                console.error(`Error fetching contact with id ${id}:`, error);
                throw error;
            });
    }

    createContact(contact: Contact): Promise<Contact> {
        return axios.post(API_URL, contact)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating contact:', error);
                throw error;
            });
    }

    updateContact(id: number, contact: Contact): Promise<Contact> {
        return axios.put(`${API_URL}/${id}`, contact)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error updating contact with id ${id}:`, error);
                throw error;
            });
    }

    deleteContact(id: number): Promise<void> {
        return axios.delete(`${API_URL}/${id}`)
            .then(() => {})
            .catch(error => {
                console.error(`Error deleting contact with id ${id}:`, error);
                throw error;
            });
    }
}

export default new ContactService();

