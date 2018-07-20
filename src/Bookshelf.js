import React, { Component } from 'react'
import Books from './Books.js'

class Bookshelf extends Component {
  render() {

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <Books
              shelf={this.props.shelf}
              books={this.props.books}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
