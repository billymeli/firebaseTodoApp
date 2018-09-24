import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { keyword: ''};
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ keyword: event.target.value });
    this.props.handleSearchKeyword(event.target.value);
  }

  render() {
    return (
      <div className="search_bar">
        <input
          placeholder="Search Gif"
          className="gif_input"
          value={this.state.keyword}
          onChange={this.onInputChange}
        />
      </div>
    );
  }
}

export default SearchBar;
