import React, { Component } from 'react'
import Book from './Book.js'

class Bookshelf extends Component {

  /* Handle change to shelf value
  handleChange(book, shelf) {
    console.log(book, shelf)
    this.props.onMoveBook(book, shelf)
  }*/

  render() {

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {this.props.books.filter(book => book.shelf === this.props.shelf)
                .map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onMoveBook={this.props.onMoveBook}
                  />
                {/*}  <div className="book">
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
                </div>*/}
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
