import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete';

// const AutoCompleteFilters = ({...props}) => (
//   <div>
//     <AutoComplete
//       floatingLabelText="filter by retailer"
//       filter={AutoComplete.fuzzyFilter}
//       dataSource={props.retailers}
//       maxSearchResults={5}
//     />
//   </div>
// );
//
// export default AutoCompleteFilters;

export default class AutoCompleteExampleControlled extends Component {
  state = {
    searchText: '',
  };

  handleUpdateInput = (searchText) => {
    console.log(this.state.searchText)
    this.setState({
      searchText: searchText,
    });
  };

  handleNewRequest = () => {
    console.log("new request!")
    this.props.limitByRetailer(this.state.searchText)
  };

  render() {
    return (
      <div className="autocomplete">
        <AutoComplete
          hintText="filter by retailer"
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={this.props.retailers}
          filter={AutoComplete.fuzzyFilter}
          openOnFocus={true}
        />
      </div>
    );
  }
}
