const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const currentContact = contacts.find((contact) => contact.id === contactId);

  if (!currentContact) {
    return null;
  }

  return currentContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  updateContacts(contacts);

  return removeContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);

  updateContacts(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
