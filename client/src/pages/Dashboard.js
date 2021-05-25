import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap';
import CheckinList from '../components/CheckinList';
import CheckinModal from '../components/CheckinModal';
import { logout } from '../actions/authActions';



class Dashboard extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired

    }

    render() {
        const { isAuthenticated , user} = this.props.auth

        if (!isAuthenticated) {
            // not logged in so redirect to landing page
            return <Redirect to={{ pathname: '/' }} />
        }

        return (
            <Container>

                <h2>Dashboard, helllo</h2>
                { user ? `Welcome, ${user.name}`: ''}

                <Container>
                    <CheckinModal />
                    <CheckinList />
                </Container>

                <button onClick={this.props.logout}>
                   Logout
               </button>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Dashboard);