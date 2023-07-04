import React, { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  //componentDidMount

  useEffect(() => {
    const currentContacts = JSON.parse(localStorage.getItem('contacts'));
    //   const parsedContacts = JSON.parse(currentContacts);
    if (currentContacts) {
      setContacts(currentContacts);
    }
  }, []);
  //  console.log(contacts);

  // console.log(getContacts);

  //componentDidUpdate
  //  if (prevState.contacts !== this.state.contacts) {

  useEffect(() => {
    if (previous => previous !== contacts) {
      console.log(contacts);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    console.log(contacts);
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    const isContactAlreadyAdded = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    if (isContactAlreadyAdded) {
      return window.alert(
        `${isContactAlreadyAdded.name} is already in the contacts`
      );
    }
    const id = nanoid();
    const updatedContacts = [...contacts, { id, name, number }];
    setContacts(updatedContacts);
  };

  //    setContacts(prevState => {
  //       return [...prevState, contact];
  //      });
  //    }
  //  };

  const deleteContact = contactId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(updatedContacts);
  };
  //    => {
  //    return [...prevState].filter(({ id }) => id !== contactId);
  //  });
  // };

  // const updatedContacts = this.state.contacts.filter(
  //     contact => contact.id !== id
  //   );
  //   this.setState({ contacts: updatedContacts });
  //  };

  const filterContacts = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getFilteredContacts = () => {
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // } contacts.filter(contact =>
  //  contact.name.toLowerCase().includes(filter.toLowerCase())
  // );

  //const filter = this.state.filter;
  //const contacts = this.state.contacts;

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      <h1 className="section_title">Phonebook</h1>
      <ContactForm addContact={handleSubmit} />
      <h2 className="section_title">Contacts </h2>
      {!contacts.length ? (
        <p>There are now contacts in your phonebook</p>
      ) : (
        <Filter value={filter} onChangeFilter={filterContacts} />
      )}

      <ContactList
        contacts={getFilteredContacts()}
        //       filter={filter}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
