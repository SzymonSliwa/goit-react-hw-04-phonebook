import React, { Component } from 'react';

import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const getContacts = JSON.parse(localStorage.getItem('current-contacts'));
    if (getContacts) {
      this.setState({ contacts: getContacts });
    }
    console.log(getContacts);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        'current-contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleSubmit = ({ name, number }) => {
    const isContactAlreadyAdded = this.state.contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    if (isContactAlreadyAdded) {
      return window.alert(
        `${isContactAlreadyAdded.name} is already in the contacts`
      );
    }
    const id = nanoid();
    const updatedContacts = [...this.state.contacts, { id, name, number }];
    this.setState({ contacts: updatedContacts });
  };

  deleteContact = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };

  filterContacts = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filter = this.state.filter;
    const contacts = this.state.contacts;
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
        <ContactForm onSubmit={this.handleSubmit} />
        <h2 className="section_title">Contacts </h2>
        {!contacts.length ? (
          <p>There are now contacts in your phonebook</p>
        ) : (
          <Filter value={filter} onChangeFilter={this.filterContacts} />
        )}

        <ContactList
          contacts={this.getFilteredContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
