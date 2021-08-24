import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

//import { Container } from 'reactstrap';
import CheckinList from '../components/CheckinList';
import CheckinModal from '../components/CheckinModal';
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
        activeStats: false
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
        const { hour, activeOverview, activeStats } = this.state;


        if (!isAuthenticated) {
            // not logged in so redirect to landing page
            return <Redirect to={{ pathname: '/' }} />
        }

        return (

            <div className="dashboard">
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
                <div class="dashboard-wrapper">
                    {/* SIDEBAR */}
                    <div className="sidebar">
                        <div className={activeOverview ? ' sidebar-option overview selected' : 'sidebar-option overview'} onClick={() => {
                            this.setState({ activeOverview: true })
                            this.setState({ activeStats: false })
                        }}>
                            <img src="/images/icon_overview.svg" alt="admenty" />
                        </div>
                        <div className={activeStats ? 'sidebar-option team selected' : 'sidebar-option team'} onClick={() => {
                            this.setState({ activeOverview: false })
                            this.setState({ activeStats: true })
                        }}>
                            <img src="/images/icon_team.svg" alt="admenty" />
                        </div>
                        <div class="settings">
                            {/* <img src="/images/icon_settings.svg" alt="admenty" /> */}
                            <button onClick={this.props.logout}>
                                Logout
                            </button>
                        </div>

                    </div>
                    {/* WIDGETS */}
                    <div className="widgets">
                        {activeOverview &&
                            <div>
                                <div className="d-lg-flex mb-5">
                                <h1 className="mr-5">It's time for your daily checkin!</h1>
                                <CheckinModal />
                                </div>

                                <CheckinList />
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