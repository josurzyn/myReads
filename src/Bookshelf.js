import React, { Component } from 'react'
//import Books from './Books.js'

class Bookshelf extends Component {
  state = {
    value: this.props.books.shelf
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  render() {

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {this.props.books.filter(book => book.shelf === this.props.shelf)
                .map(book => (
                <li key={book.id}>
                  <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={this.state.value} onChange={this.handleChange}>
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
                    {book.authors.map(author => (
                    <p key={author} className="author">{author}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
