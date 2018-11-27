import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      newItemText: ''
    }
  }

  loadAllTheTodosFromTheAPI = () => {
    axios
      .get('https://one-list-api.herokuapp.com/items/?access_token=franksFirst')
      .then(response => {
        this.setState({
          todos: response.data
        })
      })
  }

  componentDidMount = () => {
    this.loadAllTheTodosFromTheAPI()
  }

  changeText = event => {
    this.setState({
      newItemText: event.target.value
    })
  }

  newItem = event => {
    event.preventDefault()
    console.log(this.state.newItemText)

    axios
      .post(
        'https://one-list-api.herokuapp.com/items/?access_token=franksFirst',
        {
          item: {
            text: this.state.newItemText
          }
        }
      )
      .then(response => {
        this.loadAllTheTodosFromTheAPI()
      })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>One List</h1>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              const todoClass = todo.complete ? 'completed' : ''
              return (
                <li key={index} className={todoClass}>
                  {todo.text}
                </li>
              )
            })}
          </ul>
          <form onSubmit={this.newItem}>
            <input
              value={this.state.newItemText}
              type="text"
              placeholder="Whats up?"
              onChange={this.changeText}
            />
          </form>
        </main>
        <footer>
          <p>
            <img src={logo} height="42" alt="logo" />
          </p>
          <p>&copy; As If You'd Want To, Copyright </p>
        </footer>
      </div>
    )
  }
}

export default App

//DONE. add new item list.
// -create list on postman.
// -make them true.
//Get it to display.
//complete task or line through it
//delete item after done with it. should disappear

//Wrap input in a form
//Submit targets the form submitted

//1076, 1078, 1079. 1095
