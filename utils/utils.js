function idGenerator(contactsArr) {
    if (contactsArr.length === 0) {
        return 1;
    }

    const idArr = contactsArr.map(contact => contact.id);
    const maxIdValue = Math.max(...idArr);
    return maxIdValue + 1;
}

module.exports = idGenerator;