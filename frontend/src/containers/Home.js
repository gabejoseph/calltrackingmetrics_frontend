import React from 'react'
import './Home.css'
import Card from '../components/Card'
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import ListingMenu from './ListingMenu'
import { listingActions } from '../actions/listing.actions';


class Home extends React.Component {

    componentDidMount() {
        this.props.getListings()
    }

    render () {
        const loading = this.props.loading
        const listing = this.props.listing
        return (
            <div className='home'>
                
                <ListingMenu />
                <div className='home_section'>
                    {console.log(listing)}
                    {
                        listing && !loading 
                        ?
                        listing.map(list => 
                            <Card 
                                src=""
                                title={list.to}
                                description={list.body} 
                            />
                        )
                        :
                        <></>
                    }
                    <Card 
                        src="https://a0.muscache.com/im/pictures/eb9c7c6a-ee33-414a-b1ba-14e8860d59b3.jpg?im_w=720"
                        title="Welcome!"
                        description="CallTrackingMetrics lets users send and receive text messages.  Try it out!"
                    />
                </div>
            </div>
        )
    }

}

function mapState(state) {
    const loading = state.listing.loading
    const listing = state.listing.listing
    return { listing, loading };
}

const actionCreators = {
    getListings: listingActions.getListings
}

export default connect(mapState, actionCreators)(Home);


