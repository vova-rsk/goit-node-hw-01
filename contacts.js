const fs = require('fs').promises;
const path = require('path');
require('colors');
const idGenerator = require('./utils/utils');

const contactsPath = path.join(__dirname + '/db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = await JSON.parse(data.toString());

        if (contacts.length === 0) {
            console.log('Your contact-list is empty'.red);
            return;
        }

        contacts.forEach(({ name, email, phone}, idx) => {
            console.log(`${idx + 1}. ${name}  ${email}  ${phone}`);
        });
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = await JSON.parse(data.toString());

        if (isNaN(contactId)) {
            console.log(`id format is incorrect`.red);
            return;
        }

        const contact = contacts.find(({ id }) => id === contactId);

        if (!contact) {
            console.log(`Contact with id=${contactId} not found`.red);
            return;
        }

        const { name, email, phone } = contact;
        console.log(`${name}  ${email}  ${phone}`);
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = await JSON.parse(data.toString());

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
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = await JSON.parse(data.toString());
        
        if (!name || !email || !phone) {
            console.log('not entered all required arguments'.red);
            return;
        }

        contacts.push({
            id: idGenerator(contacts),
            name,
            email,
            phone
        });

        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(`New contact successfully added`.green);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};