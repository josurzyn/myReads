import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(query).then((response) =>
      this.setState({ results: response})
      //console.log(response)
    )
    console.log(this.state.results)
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  handleChange(book, shelf) {
    console.log(book, shelf)
    this.props.onMoveBook(book, shelf)
  }

  render() {

    const { query } = this.state

  /*  if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      console.log(query, match)
      BooksAPI.search(query).then((response) =>
        this.setState({ results: response})
        //console.log(response)
      )
    //  showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      //showingContacts = contacts
      console.log('no query')
    }*/



    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              { this.state.results.length ?
                this.state.results.map(book => (
                <li key={book.id}>
                  <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={book.imageLinks ?
                      { width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` } :
                      { width: 128, height: 188, backgroundImage: `url(http://via.placeholder.com/128x193?text=No+Image)` }}>
                      </div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => this.handleChange(book, event.target.value)}>                      )}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors ? book.authors.map(author => (
                    <p key={author} className="author">{author}</p>
                  )) : <p className="author">Author Unknown</p>}
                  </div>
                </div>
              </li>
            )) : <p>Sorry, no search results</p>}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
