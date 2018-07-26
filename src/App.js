import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    results: []
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
      this.getBooks()
      console.log('getting books')
    })
  }

  addBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() =>
      BooksAPI.getAll().then((books) => {
      this.setState({ books }, () => this.updateResults(this.state.query))
    })
    )
  }
  //adding search functionality to app
    updateQuery = (query) => {
      console.log(query)
      this.setState({ query: query }, () => this.updateResults(this.state.query))
    }

    updateResults = (query) => {
      //this.setState({ query: 'banana' })
      let booksOnShelves = this.state.books.filter( (book) => book.shelf === 'currentlyReading' || 'wantToRead' || 'read')
      console.log('state query ', this.state.query, 'using query ', query, booksOnShelves)
      BooksAPI.search(query).then((response) => {
        if (response && !response.error) {
          response.forEach(book => {
            let bookMatch = booksOnShelves.find(b => book.id === b.id)
            console.log(bookMatch)
            if (bookMatch) {
              console.log('book found!', book.title, bookMatch)
              book.shelf = bookMatch.shelf
            } else {
              //console.log('book not already on shelf', book.title)
              book.shelf = 'none'
            }
          })
          this.setState({ results: response})
        } else {
          this.setState({ results: [] })
        }
      })
    }

    clearQuery = () => {
        this.setState({ query: '' }, () => this.updateResults(this.state.query))
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
            //booksOnShelves = {this.state.books.filter( (book) => book.shelf === 'currentlyReading' || 'wantToRead' || 'read')}
            onAddBook={this.addBook}
            results={this.state.results}
            onUpdateQuery={this.updateQuery}
            onClearQuery={this.clearQuery}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
