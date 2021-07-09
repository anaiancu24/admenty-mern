import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form, 
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addMood } from '../actions/moodActions';
import PropTypes from 'prop-types';

class CheckingModal extends Component {
    state = {
        modal:false,
        mood: '',
        positivity: null,
        happiness: '',
        notes: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const newCheckin = {
            mood: this.state.mood,
            positivity: this.state.positivity,
            happiness: this.state.happiness,
            notes: this.state.notes
        }

        // Add mood via addMood action
        this.props.addMood(newCheckin)

        // Close toggle
        this.toggle()
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? 
                                <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={this.toggle}
                                >
                                    Checkin
                                </button> : ''
                }


                <Modal
                isOpen={this.state.modal}
                toggle={this.state.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        How do you feel today?
                    </ModalHeader>

                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="mood">Select your current mood</Label>
                                <Input type="text" name="mood" id="mood" placeholder="Happy, Excited, Sad...." onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup>
                                <Label for="positivity">How positive do you feel today</Label>
                                <Input type="range" min="1" max="10" name="positivity" id="positivity" onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup>
                                <Label for="happiness">How happy do you feel today?</Label>
                                <Input type="select" name="happiness" id="happiness" onChange={this.onChange}>
          <option>Meh</option>
          <option>Super happy</option>
          <option>Happy</option>
          <option>I'm ok happy</option>
          <option>Not happy at all</option>
        </Input>
        </FormGroup>
        <FormGroup>
                                <Label for="notes">Anything on your mind?</Label>
                                <Input type="textarea" name="notes" id="notes" placeholder="Today I feel grateful for.." onChange={this.onChange}/>
                                
                                <Button color="dark" style={{marginTop:'2rem'}} block>Checkin</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    mood: state.mood,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps, {addMood} )(CheckingModal)