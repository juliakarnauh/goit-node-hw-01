const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  const data = fs.readFileSync(contactsPath, "utf8");
  return JSON.parse(data);
}

function updateContacts(contacts) {
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}

function getContactById(contactId) {
  const contacts = listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

function removeContact(contactId) {
  const contacts = listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  updateContacts(contacts);
  return result;
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
