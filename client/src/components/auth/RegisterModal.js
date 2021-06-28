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
import { Redirect } from 'react-router-dom';

import { register } from '../../actions/authActions';
import {clearErrors} from "../../actions/errorActions"

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.status === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg})
            } else {
                this.setState({ msg: null})
            }
        }
        // If authenticated, close modal
        if(this.state.modal) {
            if(this.props.isAuthenticated) {
                this.toggle()
                return <Redirect to="/dashboard" />
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

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email, 
            password
        }
        // Attempt for register
        this.props.register(newUser)
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#" className="text-primary">
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.state.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Type your name.." onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Type your email.." onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Type your password.." onChange={this.onChange} />
                            </FormGroup>

                            <Button color="dark" style={{ marginTop: '2rem' }} block>Register</Button>
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

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal)