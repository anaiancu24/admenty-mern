import React, { Component } from 'react';
import AppNavBar from '../components/AppNavBar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import '../styles/LandingPage.scss';
import { Container } from 'reactstrap';


class Landing extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated } = this.props.auth

        return (
            <Container>
                <AppNavBar />
                <div className="header d-lg-flex">
                    <div className="mr-auto header-intro pr-5">
                        <div>
                        <h1 className="heading mb-3">Are you happy, <span className="text-primary">realllly</span> happy?</h1>
                        <p className="text-secondary mb-4">It's time to start tracking your happiness, too. With our platform, you can see patterns in your life and can avoid burnouts, depression and prevent unhappiness.</p>
                        <button type="button" class="btn btn-primary">Start tracking your happiness</button>
                        </div>
                    </div>
                    <div className="ml-auto header-illust">
                        <img src="/images/illust_happiness.svg" alt="happiness-illustration"/>
                    </div>
                </div>

                {isAuthenticated &&
                    <Redirect to={{
                        pathname: "/dashboard"
                    }} />
                }
            </Container>

        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Landing);