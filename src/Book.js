import React, { Component } from 'react'

class Books extends Component {

  handleChange(book, shelf) {
    this.props.onMoveBook(book, shelf)
  }

  render() {

    const { book } = this.props

    return (
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

    )
  }
}

export default Books
