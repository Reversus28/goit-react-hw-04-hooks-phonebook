import React, { useState, useEffect } from "react";
import { Title } from "./App.style.jsx";
import shortid from "shortid";

import Container from "./components/Container";
import Section from "./components/Section";
import Form from "./components/Form";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const [filter, setFilter] = useState("");

  const formSubmitHandler = (data) => {
    const { name, number } = data;
    console.log("App ~ data", data);

    checkContacts(name, number);
  };

  const addContact = (name, number) => {
    console.log("name", name);
    setContacts((prevState) => [
      ...prevState,
      {
        id: shortid.generate(),
        name,
        number,
      },
    ]);
  };

  const checkContacts = (name, number) => {
    const findedContactName = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    const findedContactNumber = contacts.find(
      (contact) => contact.number === number
    );

    if (findedContactName && findedContactNumber) {
      alert(
        `${findedContactName.name} ${findedContactNumber.number} is already in contacts.`
      );
    } else if (findedContactName) {
      alert(`${findedContactName.name} is already in contacts.`);
    } else if (findedContactNumber) {
      alert(
        `This ${findedContactNumber.number} number is already in contacts. `
      );
    } else {
      addContact(name, number);
    }
  };

  const filterPhoneContact = () => {
    const filterLowerCase = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };
  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = (id) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
  };
  const filteredContacts = filterPhoneContact();

  return (
    <div className="App">
      <Section>
        <Container>
          <Title>Phonebook</Title>
          <Form onSubmit={formSubmitHandler} />
          <Contacts contacts={filteredContacts} onClick={deleteContact}>
            <Filter onChange={changeFilter} inputSearch={filter} />
          </Contacts>
        </Container>
      </Section>
    </div>
  );
}
