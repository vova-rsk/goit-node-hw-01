const fs = require('fs').promises;
const path = require('path');
require('colors');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname + '/db/contacts.json');

async function getContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function listContacts() {
    const contacts = await getContacts();
    
    if (contacts.length === 0) {
        console.log('Your contact-list is empty'.red);
        return;
    }

    console.table(contacts);
}

async function getContactById(contactId) {
    const contacts = await getContacts();

    if (isNaN(contactId)) {
        console.log(`id format is incorrect`.red);
        return;
    }

    const contact = contacts.find(({ id }) => id === contactId);

    if (!contact) {
        console.log(`Contact with id=${contactId} not found`.red);
        return;
    }

    console.table([contact])
}

async function removeContact(contactId) {
    const contacts = await getContacts();

    if (isNaN(contactId)) {
        console.log(`id format is incorrect`.red);
        return;
    }

    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    if (contacts.length === filteredContacts.length) {
        console.log(`Contact with id=${contactId} not found`.red);
        return;
    }

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log(`Contact with id=${contactId} successfully removed`.green);
}

async function addContact(name, email, phone) {
    const contacts = await getContacts();
    
    if (!name || !email || !phone) {
        console.log('not entered all required arguments'.red);
        return;
    }

    contacts.push({
        id: uuidv4(),
        name,
        email,
        phone
    });

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`New contact successfully added`.green);
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};