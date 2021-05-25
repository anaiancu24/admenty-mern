import React, { Component } from 'react';
import AppNavBar from '../components/AppNavBar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Landing extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated } = this.props.auth

        return (
            <div>
                <AppNavBar />
                <h2>Landing page, helllo</h2>

                {isAuthenticated &&
                    <Redirect to={{
                        pathname: "/dashboard"
                    }} />
                }
            </div>

        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Landing);