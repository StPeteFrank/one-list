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
          text: this.state.newItemText
        }
      )
      .then(response => {
        this.loadAllTheTodosFromTheAPI()
      })
  }
  scratchOff = event => {
    axios
      .put(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.idtodo
        }?access_token=franksFirst`,
        {
          item: {
            complete: true
          }
        }
      )
      .then(response => {
        this.loadAllTheTodosFromTheAPI()
      })
  }
  delete = event => {
    axios
      .delete(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.idtodo
        }?access_token=franksFirst`
      )
      .then(response => {
        this.loadAllTheTodosFromTheAPI()
      })

    console.log('double')
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Plaxco's To Do List</h1>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              const todoClass = todo.complete ? 'completed' : ''
              return (
                <li
                  onDoubleClick={this.delete}
                  data-idtodo={todo.id}
                  onClick={this.scratchOff}
                  key={index}
                  className={todoClass}
                >
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
          <p>&copy; Why wouldn't you want to Copyright </p>
        </footer>
      </div>
    )
  }
}

export default App

//DONE. add new item list.
//DONE. Get it to display.
//DONE. -create list on postman.
//DONE. -make them true. Which puts line through by means of Postman.
//DONE. complete task or line through it in react.
//DONE. delete item after done with it. should disappear using react.

//DONE. Wrap input in a form
//DONE. Submit targets the form submitted
