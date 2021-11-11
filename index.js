const contactsApi = require('./contacts');
const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        contactsApi.listContacts();
        break;

      case 'get':
        contactsApi.getContactById(id);
        break;

      case 'add':
        contactsApi.addContact(name, email, phone);
        break;

      case 'remove':
        contactsApi.removeContact(id);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }    
  } catch (error) {
    console.error(error);
  }
}

invokeAction(argv);

