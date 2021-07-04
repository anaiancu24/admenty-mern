import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';


class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>
                            { user ? `Welcome, ${user.name}`: ''}
                        </strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>

        )
        return (
            <div>
                <Navbar expand="sm" className="nav mb-5">
                        <NavbarBrand href="/">
                            <img src="/images/logo_grey.svg" className="logo" alt="admenty-logo"/>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavLink href="#benefits" className="text-secondary">
                                   Benefits
                                </NavLink>
                                <NavLink href="#howitworks" className="text-secondary">
                                    How it works
                                </NavLink>
                                <NavLink href="#pricing" className="text-secondary">
                                    Pricing
                                </NavLink>
                                <NavLink href="#contact" className="text-secondary">
                                    Contact
                                </NavLink>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>

                        </Collapse>
                </Navbar>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavBar);