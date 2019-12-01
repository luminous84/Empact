import React from 'react';
import "./SearchPage.css";

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    const search = this.props.location.state.search.toString();
    console.log(search);
  }

  render() {
    return (
      <div>
        <p>hello</p>
      </div>
    );
  }

}

export default SearchPage;
