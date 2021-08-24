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
                            <h1 className="heading mb-3">Your daily mental health tracker</h1>
                            <p className="text-secondary mb-4">Make your happiness and mental being a priority as much as you care about your physical health. </p>
                            <button type="button" class="btn btn-primary">Start tracking your happiness</button>
                        </div>
                    </div>
                    <div className="ml-auto header-illust">
                        <img src="/images/illust_walking.svg" alt="happiness-illustration" />
                    </div>
                </div>

                <div className="section text-center">
                    <h2 className="mb-3">Is mental health your priority?</h2>
                    <p className="mb-5">According to World Health Organization, 264 million people are affected by depression globally. Yet, mental health remains a neglected concern. If you are confused about prioritizing or looking after your mental health, Admenty is the solution.  </p>
                    <div className="row d-lg-flex">
                        <div className="item col">
                            <img className="mb-4 benefit-illust" src="/images/illust_happy.svg" alt="" />
                            <h3>Keeps you aware of your mental state</h3>
                            <p>A mental health tracker allows you to keep a record of your mood swings, so you are aware of your mental state. </p>
                        </div>
                        <div className="item col">
                            <img className="mb-4 benefit-illust" src="/images/illust_chat.svg" alt="" />
                            <h3>Records your mood patterns</h3>
                            <p>As it tracks your everyday moods, you can figure out which event or what triggered your mental illness such as anxiety, depression, or panic attack. </p>
                        </div>
                        <div className="item col">
                            <img className="mb-4 benefit-illust" src="/images/illust_bloom.svg" alt="" />
                            <h3>Helps you take care of yourself</h3>
                            <p>Once you can connect your moods and varying patterns to specific situations and events, you can try to avoid those unfavorable circumstances that trigger your mental burnout.</p>
                        </div>
                    </div>
                </div>


                <div className="section">
                    <h2 className="mb-3 text-center">How does it work?</h2>
                    <p className="mb-5 text-center">A very intuitive platform that will guide you through your daily mood and based on your checkins, you will have access to a stats dashboard to analyse your tracking.</p>
                    <div className="d-lg-flex justify-content-center align-items-center">
                        <div className="mr-4">
                            <ol className="list-items">
                                <li className="list-item">
                                    All you have to do is enter your daily moods in the app and save it.
                            </li>
                                <li className="list-item">
                                    It is extremely important, to be honest about your feelings and mental state when you enter your daily thoughts.
                            </li>
                                <li className="list-item">
                                    This way, the app will be able to generate accurate insights about the patterns of moods such as being happy, excited or sad.
                            </li>
                                <li className="list-item">
                                    The app analyses the trends and spikes in your moods to produce a statistical report which indicates the overall situation of your mental health.
                            </li>
                                <li className="list-item">
                                    As a result, you are aware of your feelings and if you need to take any measures to take care of yourself.
                            </li>
                            </ol>
                        </div>
                        <img className="placeholder-dashboard" src="/images/placeholder_dashboard-gif.png" alt="" />

                    </div>

                </div>

                <div className="section text-center">
                    <h2 className="mb-3">Try our mental health tracker today</h2>
                    <p className="mb-4">If your mental health is not stable, you cannot achieve optimum physical health as well. Therefore, both mental and physical health is important for your overall wellbeing.   </p>
                    <button type="button" class="btn btn-primary">Free trial</button>

                </div>

                <footer className="d-lg-flex">
                    <div className="d-lg-flex">
                        <span className="mr-2">Contact</span>
                        <span className="mr-2">Terms and conditions</span>
                        <span className="mr-2">Privacy policy</span>
                    </div>
                    <span className="ml-auto">Admenty 2021</span>
                </footer>



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