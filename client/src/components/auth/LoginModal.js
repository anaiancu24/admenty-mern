import React, { Component } from 'react';
import {
    NavLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/authActions';
import { clearErrors } from "../../actions/errorActions"

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.status === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
        // If authenticated, close modal and redirect to dashboard
        if (this.state.modal) {
            if (this.props.isAuthenticated) {
                this.toggle()
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        // Attempt to login
        this.props.login(user)

    }

    render() {

        return (
            <div>
                <NavLink onClick={this.toggle} href="#" className="text-primary">
                    Login
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.state.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Login
                    </ModalHeader>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>

                            <FormGroup>
                                <Label for="name">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Type your email.." onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Type your password.." onChange={this.onChange} />
                            </FormGroup>

                            <Button color="dark" style={{ marginTop: '2rem' }} block>Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)