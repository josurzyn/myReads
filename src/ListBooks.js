import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'
// import Book from './Book.js'
import Header from './Header.js'
import OpenSearch from './OpenSearch.js'
// import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  render() {

    return (
      <div className="list-books">
        <Header/>
        <div className="list-books-content">
          <div>

            <Bookshelf
              shelf="currentlyReading"
              shelfName="Currently Reading"
              books={this.props.books}
            />

            <Bookshelf
              shelf="wantToRead"
              shelfName="Want to Read"
              books={this.props.books}
            />

            <Bookshelf
              shelf="read"
              shelfName="Read"
              books={this.props.books}
            />

          </div>
        </div>
        <OpenSearch/>
      </div>
    )
  }
}

export default ListBooks
