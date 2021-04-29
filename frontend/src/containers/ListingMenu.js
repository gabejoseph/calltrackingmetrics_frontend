import React from 'react';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { listingActions } from '../actions/listing.actions';
import { Button } from '@material-ui/core'
import './ListingMenu.css'

class SimpleMenu extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
        body: '',
        phone: '',
        submitted: false
    };

  }

  handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
      e.preventDefault();

      this.setState({ submitted: true });
      const { body, phone } = this.state;
      if (body && phone) {
        let user = JSON.parse(localStorage.user).user.id
        let listing = { body, phone, user }
        this.props.createListing(listing);
        window.location.reload()
        this.props.history.push('/');
      }
  }
  
  render() {

    const local = localStorage
    const { body, phone, submitted } = this.state;

    return (
      <div className='text_form'>
        <form name="form" onSubmit={this.handleSubmit}>
            <h2>Send a new Text!</h2>
            <div className={'form-group' + ( !body ? ' has-error' : '')}>
                <TextField type="text" label="Body" htmlFor="body" className="form-control" name="body" value={body} onChange={this.handleChange} />
                { !body && submitted &&
                    <div className="help-block">Your text needs some text!</div>
                }
            </div>
            <div className={'form-group' + ( !phone ? ' has-error' : '')}>
                <TextField type="text" label="Phone Number" htmlFor="phone" className="form-control" name="phone" value={phone} onChange={this.handleChange} />
                { !phone && submitted &&
                    <div className="help-block">A number to send to is required</div>
                }
            </div>
            <Button type="submit" className="btn btn-primary">Submit</Button>
        </form>
      </div>
    );
  }
}

const actionCreators = {
  createListing: listingActions.createListing
};

export default connect(null, actionCreators)(SimpleMenu)

