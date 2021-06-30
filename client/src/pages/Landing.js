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

                <div className="section text-center">
                    <h2 className="mb-5">Why would you track your moods and happiness?</h2>
                    <div className="d-lg-flex">
                        <div className="item">
                            <img className="mb-4" src="/images/icon_pyramid.svg" alt="" />
                            <h3>Notice patterns</h3>
                            <p>You can see patterns when you become sad or anxious or happy and be aware of that triggers you</p>
                        </div>
                        <div className="item">
                            <img className="mb-4" src="/images/icon_pyramid.svg" alt="" />
                            <h3>Notice patterns</h3>
                            <p>You can see patterns when you become sad or anxious or happy and be aware of that triggers you</p>
                        </div>                        
                        <div className="item">
                            <img className="mb-4" src="/images/icon_pyramid.svg" alt="" />
                            <h3>Notice patterns</h3>
                            <p>You can see patterns when you become sad or anxious or happy and be aware of that triggers you</p>
                        </div>
                    </div>
                </div>


                <div className="section text-center">
                    <h2 className="mb-5">How does it work?</h2>
                    <div className="d-lg-flex">
                        <div>
                        <p>
                            A very intuitive platform that will guide you through your daily mood and based on your checkins, you will have access to a stats dashboard to analyse your tracking.
                        </p>
                        <ol>
                            <li>
                                Check in everyday honestly
                            </li>
                            <li>
                                Set your current mood
                            </li>
                            <li>
                                Write down your thoughts
                            </li>
                            <li>
                                Save and do it everyday
                            </li>
                            <li>
                                Analyse your stats
                            </li>
                        </ol>
                        </div>
                        <img src="" alt="" />

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