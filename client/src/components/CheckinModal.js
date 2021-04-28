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

class CheckingModal extends Component {
    state = {
        modal:false,
        mood: ''
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

        const newMood = {
            mood: this.state.mood
        }

        // Add mood via addMood action
        this.props.addMood(newMood)

        // Close toggle
        this.toggle()
    }

    render() {
        return (
            <div>
                <Button
                color="dark"
                style={{marginBottom:'2rem'}}
                onClick={this.toggle}
                >
                    Checkin
                </Button>

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
                                <Label for="mood">Just type you current mood</Label>
                                <Input type="text" name="mood" id="mood" placeholder="Happy, Excited, Sad...." onChange={this.onChange}/>
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
    mood: state.mood
})

export default connect( mapStateToProps, {addMood} )(CheckingModal)