import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete';

export default class AutoCompleteControlled extends Component {
  state = {
    searchText: '',
  };

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

  handleNewRequest = () => {
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
