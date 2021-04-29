import React from 'react'
import './Home.css'
import Card from '../components/Card'
import { connect } from 'react-redux';
import ListingMenu from './ListingMenu'
import { listingActions } from '../actions/listing.actions';


class Home extends React.Component {

    componentDidMount() {
        this.props.getListings()
    }

    

    render () {
        const user_id = JSON.parse(localStorage.user).user.id
        const loading = this.props.loading
        const listing = this.props.listing.filter(x => x.user_id === user_id)
        return (
            <div className='home'>
                
                <ListingMenu />
                <div className='home_section'>
                    {
                        listing && !loading 
                        ?
                        listing.map(list => 
                            list.direction === "outbound-api" ?
                            <Card 
                                src="https://churchos-uploads.s3.amazonaws.com/2020/10/31/22/39/59/ad4e3d27-28c9-48cd-bcd8-7021aff225c7/Sent.jpg"
                                title={list.to}
                                description={list.body} 
                                direction={list.direction}
                            />
                            :
                            <Card 
                            src="https://bluefieldhighschool.files.wordpress.com/2017/03/icoming-logo-final.jpg"
                            title={list.from}
                            description={list.body} 
                            direction={list.direction}
                            />
                        )
                        :
                        <></>
                    }
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


