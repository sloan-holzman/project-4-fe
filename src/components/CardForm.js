import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './muiTheme'
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import '../stylesheets/form.css'

const CardForm = ({...props}) => {
  const {
      card,
      title,
      handleSubmit,
      updateCardRetailerOrExpirationState,
      onChange,
      errorText,
      retailerNames
    } = props
  let expiration = card && card.expiration ? new Date(card.expiration) : null

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <RadioButtonGroup name="type" defaultSelected={card.type} onChange={onChange}>
            <RadioButton
              value="gift card"
              label="gift card"
            />
            <RadioButton
              value="coupon"
              label="coupon"
            />
          </RadioButtonGroup>
          <div className="autocomplete">
            <AutoComplete
              name="retailer"
              hintText="e.g. j crew, walmart, amazon"
              floatingLabelText="retailer"
              searchText={card.retailer}
              onUpdateInput={(val) => updateCardRetailerOrExpirationState("retailer", val)}
              dataSource={retailerNames}
              filter={AutoComplete.fuzzyFilter}
              openOnFocus={true}
              maxSearchResults={10}
              fullWidth={true}
              required
            />
          </div>
          <TextField
            name="number"
            hintText="e.g. 0123456789"
            floatingLabelText="number"
            fullWidth={true}
            onChange={onChange}
            defaultValue={card.number}
            required
          />
          <TextField
            name="pin"
            hintText="e.g. 1234"
            floatingLabelText="pin"
            fullWidth={true}
            onChange={onChange}
            defaultValue={card.pin}
          />
          <TextField
            name="amount"
            hintText="e.g. $100.00 or 15%"
            floatingLabelText="amount ($ or %)"
            fullWidth={true}
            errorText= {errorText}
            onChange={onChange}
            defaultValue={card.amount}
          /><br/>
          {
            expiration ? <DatePicker name="expiration" hintText="expiration date" fullWidth={true} defaultDate={expiration} onChange={(e, date) => updateCardRetailerOrExpirationState("expiration", date)} /> : <DatePicker name="expiration" hintText="expiration date" fullWidth={true} onChange={(e, date) => updateCardRetailerOrExpirationState("expiration", date)} />
          }
          <br/>
          <br/>
          <RaisedButton label="update" primary={true} type="submit" />
        </MuiThemeProvider>
      </form>
    </div>
  )
}

CardForm.defaultProps = {
  card: "Edit",
}

export default CardForm
