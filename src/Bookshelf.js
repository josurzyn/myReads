import React, { Component } from 'react'
import Books from './Books.js'

class Bookshelf extends Component {
  render() {

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
            <Books
              shelf={this.props.shelf}
              books={this.props.books}
            />
        </div>
      </div>
    )
  }
}

export default Bookshelf
