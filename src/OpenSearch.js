import React from 'react'

function OpenSearch() {
  return (
    <div className="open-search">
      <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
    </div>
  )
}

export default OpenSearch
