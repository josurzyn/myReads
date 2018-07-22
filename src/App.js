import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'

console.log(BooksAPI.getAll())

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount() {
  //  BooksAPI.getAll().then((books) => {
  //    this.setState({ books })
  //  })
  this.getBooks()
  }

  /*moveBook = (event) => {
    const targetValue = event.target.value
    const targetID = event.target.name
    let bookToMove = this.state.books.filter((book) => book.id === targetID)
    // trying to find book to edit in array, pull out, edit, then concat with books
    bookToMove[0].shelf = targetValue
    this.setState({ books: this.state.books})
  }*/

  moveBook = (book, shelf) => {
    //console.log(event, event.target.name, event.target.value)
    BooksAPI.update(book, shelf).then((response) => {
      console.log(response)
      this.getBooks()
      console.log('getting books')
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <SearchBooks
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
