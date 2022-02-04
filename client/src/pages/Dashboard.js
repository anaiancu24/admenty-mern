import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

//import { Container } from 'reactstrap';
import CheckinList from '../components/CheckinList';
import CheckinModal from '../components/CheckinModal';
import Stats from '../components/Stats';

import { logout } from '../actions/authActions';
import '../styles/Dashboard.scss';


class Dashboard extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    state = {
        hour: null,
        activeOverview: true,
        activeStats: false,
        activeSettings: false
    }

    componentDidMount() {
        this.getHour()
    }

    getHour = () => {
        const date = new Date();
        const hour = date.getHours()
        this.setState({
            hour
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth
        const { hour, activeOverview, activeStats, activeSettings } = this.state;


        if (!isAuthenticated) {
            // not logged in so redirect to landing page
            return <Redirect to={{ pathname: '/' }} />
        }

        return (

            <div className="dashboard" style={{
                "background":"url('/images/bg_waves1.jpg')", 
                "background-repeat": "no-repeat",
                "background-color": "#3389E6",
                "background-size": "cover",
            }}>
                <nav className="toolbar">
                    <div className="logo">
                        <img src="/images/logo_grey.svg" alt="logo-admenty" />
                    </div>
                    {user ?
                        <div className="greeting">
                            {hour < 12 && hour > 5 && <p>Good Morning, <span className="highlighted">{user.name}</span> !</p>}
                            {hour < 18 && hour > 12 && <p>Good Afternoon, <span className="highlighted">{user.name}</span> !</p>}
                            {hour >= 18 && <p>Good Evening, <span className="highlighted">{user.name}</span> !</p>}
                            {hour < 5 && <p>Good Night, <span className="highlighted">{user.name}</span> !</p>}
                        </div> : ''}
                </nav>
                <div className="dashboard-wrapper">
                    {/* SIDEBAR */}
                    <div className="sidebar">
                        <div className={activeOverview ? 'sidebar-option overview selected' : 'sidebar-option overview'} onClick={() => {
                            this.setState({ activeOverview: true })
                            this.setState({ activeStats: false })
                            this.setState({ activeSettings: false })
                        }}>
                            <img src="/images/icon_checkin.svg" alt="admenty" />
                        </div>
                        <div className={activeStats ? 'sidebar-option stats selected' : 'sidebar-option stats'} onClick={() => {
                            this.setState({ activeOverview: false })
                            this.setState({ activeStats: true })
                            this.setState({ activeSettings: false })
                        }}>
                            <img src="/images/icon_statistics.svg" alt="admenty" />
                        </div>
                        <div className={activeSettings ? 'sidebar-option settings selected' : 'sidebar-option settings'} onClick={() => {
                            this.setState({ activeOverview: false })
                            this.setState({ activeStats: false })
                            this.setState({ activeSettings: true })
                        }}>
                            <img src="/images/icon_settings.svg" alt="admenty" />
                        </div>
                        <div className="logout">
                            <img onClick={this.props.logout} src="/images/icon_logout.svg" alt="admenty" />
                        </div>

                    </div>
                    {/* WIDGETS */}
                    <div className="widgets">
                        {activeOverview &&
                            <div className="widgets-wrapper">
                                <div className="widgets-left">
                                    <div className="widget widget-quote">
                                        <div className="quote-wrapper">
                                        <p className="quote">I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be.</p>
                                        <p className="quoter">Ken Venturi</p>
                                        </div>

                                    </div>
                                    <div className="widget widget-checkin-list">
                                        <CheckinList />
                                    </div>

                                </div>
                                <div className="widgets-right">
                                    <div className="widget widget-checkin">
                                        <CheckinModal />
                                    </div>

                                </div>


                            </div>
                        }
                        {activeStats &&
                            <div>

                                <h1>Here are your mood stats</h1>



                                <Stats />
                            </div>
                        }


                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Dashboard);