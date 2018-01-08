import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeStock} from '../actions/stocks'

class Stock extends Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove (e) {
    fetch(`http://localhost:3001/api/stocks/${e.target.value}`, {method: 'DELETE'})
    .then(response => {console.log(response), this.props.history.push('/stocks')})
    .catch(err => {console.log(err)})
  }

  render() {
    let stock = this.props.stocks.find((stock) => stock.symbol === this.props.match.params.symbol)
    return (
      <div>
        <h2>{stock.name} ({stock.symbol})</h2>
        <p>Current Price: {stock.price}</p>
        <button value={stock.symbol} onClick={this.handleRemove}>Untrack Stock</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stockReducer.stocks
})


export default connect(mapStateToProps)(Stock)
