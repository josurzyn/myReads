import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {

  // Clear results when leaving page
  componentWillUnmount() {
    this.props.onClearQuery()
  }

  // Handle change to shelf value
  handleChange(book, shelf) {
    console.log(book, shelf)
    this.props.onAddBook(book, shelf)
  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.props.onUpdateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              { this.props.results.length ?
                this.props.results.map(book => (
                <li key={book.id}>
                  <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={book.imageLinks ?
                      { width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` } :
                      { width: 128, height: 188, backgroundImage: `url(http://via.placeholder.com/128x193?text=No+Image)` }}>
                      </div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => this.handleChange(book, event.target.value)}>
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
            )) : null}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
