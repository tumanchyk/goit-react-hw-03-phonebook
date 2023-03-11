import { Component } from "react"
import { Container } from "./Styles/Container.styled.jsx";
import {Title1, Title2} from './Styles/Titles.styled.jsx'
import { ContactForm } from "./Form/ContactForm";
import ContactList from "./ContactsList/ContactsList.jsx";
import Filter from "./Filter/Filter.jsx";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

 class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onFormSubmit= contact =>{
    const someName = this.state.contacts.filter(item=> contact.name.toLowerCase() === item.name.toLowerCase())
    if(someName.length === 1){
      Notify.failure(`${contact.name} is already in contacts.`);
     return;
    }
    
  this.setState(({contacts}) => ({
    contacts: [contact, ...contacts],
  }))

  }

  onDeleteContact = contactId => {
    this.setState(({contacts})=> ({
    contacts: contacts.filter(({id}) => id !== contactId)
  })
    ) }

  handleFilter = e => {
    this.setState({filter: e.target.value})}

  findContact(){
    const {contacts, filter} = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }
  componentDidMount(){
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts)
    if(parsedContacts){
      this.setState({contacts: parsedContacts})
    }
    
  }
  componentDidUpdate(prevProp, prevState){
    if(prevState.contacts !== this.state.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render(){
    const foundContacts = this.findContact();
  return (
    <Container>
  <Title1>Phonebook</Title1>
  <ContactForm onSubmit={this.onFormSubmit}/>

  <Title2>Contacts</Title2>
  <Filter value={ this.state.filter } onChange={this.handleFilter}/> 
  <ContactList contacts={foundContacts} handleDelete={this.onDeleteContact}/>
    </Container>
  )}
};
export { App };

