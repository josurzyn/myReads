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
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBook = (event) => {
    console.log(event.target.value, event.target.name, this.state.books)
    const targetValue = event.target.value
    const targetID = event.target.name
    console.log(targetValue, targetID)
    let bookToMove = this.state.books.filter((book) => book.id === targetID)
    console.log(this.state.books)
    console.log(bookToMove)
    // trying to find book to edit in array, pull out, edit, then concat with books
    bookToMove[0].shelf = targetValue
    console.log(bookToMove)
    this.setState({ books: this.state.books})
    //this.setState( (state) => ({
    //  books: this.state.books.filter( (book) => book.id !== targetID)
    //}))
    //console.log(this.state.books)
    //console.log(targetID)
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
