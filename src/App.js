import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import { throttle } from 'throttle-debounce'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    results: []
  }

  // Fetch books using API
  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Fetch books after initial page load
  componentDidMount() {
    this.getBooks()
  }

  // Move book between shelves
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.getBooks()
    })
  }

  // Add new book to shelf and update results to reflect change
  addBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() =>
      BooksAPI.getAll().then((books) => {
      this.setState({ books }, () => this.updateResults(this.state.query))
    })
    )
  }

  // Update state query based on input and call for results to update
  updateQuery = (query) => {
    this.setState({ query: query }, () => this.updateResultsThrottled(this.state.query))
  }

  // Update search results using updated state query
  updateResults = (query) => {
    // Find books already on shelves
    let booksOnShelves = this.state.books.filter( (book) => book.shelf === 'currentlyReading' || 'wantToRead' || 'read')
    console.log('state query ', this.state.query, 'using query ', query, booksOnShelves)
    // Check if query or deleted
    if (query.length) {
      // Get search results from BooksAPI, check against books already on booksOnShelves
      // and update shelf accordingly
      BooksAPI.search(query).then((response) => {
        if (response && !response.error) {
          response.forEach(book => {
            let bookMatch = booksOnShelves.find(b => book.id === b.id)
            if (bookMatch) {
              book.shelf = bookMatch.shelf
            } else {
              book.shelf = 'none'
            }
          })
          // Check query results still match current query
          if (query === this.state.query) {
            this.setState({ results: response})
          }
        } else {
          // Set results as empty if error with API response
          this.setState({ results: [] })
        }
      })
    } else {
      // Set results as empty if query is empty
      this.setState({ results: [] })
    }
  }

  // Update results using throttle to manage fast-typed requests
  updateResultsThrottled() {
    throttle(300, this.updateResults(this.state.query))
  }

    // Clear query and update results to clear
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
