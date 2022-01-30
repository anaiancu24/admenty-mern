import React, { Component } from 'react';
import {
    Button,
    // Modal,
    // ModalHeader,
    // ModalBody,
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
        // modal: false,
        mood: '',
        mood_level: 6,
        intensity: null,
        cause: '',
        gratefulness: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    // toggle = () => {
    //     this.setState({
    //         modal: !this.state.modal
    //     })
    // }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        if (e.target.name === 'mood') {
            this.setState({
                [e.target.name]: e.target.value,
                mood_level: e.target.dataset.key
            })
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const newCheckin = {
            mood: this.state.mood,
            intensity: this.state.intensity,
            cause: this.state.cause,
            gratefulness: this.state.gratefulness,
            mood_level:this.state.mood_level
        }

        // Add mood via addMood action
        this.props.addMood(newCheckin)

        // Close toggle
        // this.toggle()
    }

    render() {


        return (
            <div>
                {/* {this.props.isAuthenticated ?
                    <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={this.toggle}
                    >
                        Checkin
                    </button> : ''
                } */}


 
                    <h2>
                        How do you feel today?
                    </h2>

  
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="mood">How are you feeling today? What’s your mood?</Label>
                                {/* <Input type="text" name="mood" id="mood" placeholder="Happy, Excited, Sad...." onChange={this.onChange}/> */}
                                <FormGroup tag="fieldset" className="d-lg-flex justify-content-between flex-wrap">
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="10" value="happy" onChange={this.onChange} />{' '}
                                            Happy
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_happy.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="7" value="hopeful" onChange={this.onChange} />{' '}
                                            Hopeful
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_hopeful.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="7" value="calm" onChange={this.onChange} />{' '}
                                            Calm
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_calm.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="8" value="motivated" onChange={this.onChange} />{' '}
                                            Motivated
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_calm.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="9" value="excited" onChange={this.onChange} />{' '}
                                            Excited
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_excited.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="8" value="energized" onChange={this.onChange} />{' '}
                                            Energized
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_energized.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="1" value="sad" onChange={this.onChange} />{' '}
                                            Sad
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_sad.svg" alt="sad" />
                                    </FormGroup>

                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="1" value="anxious" onChange={this.onChange} />{' '}
                                            Anxious
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_anxious.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="2" value="angry" onChange={this.onChange} />{' '}
                                            Angry
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_angry.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="1" value="depressed" onChange={this.onChange} />{' '}
                                            Depressed
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_depressed.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="3" value="grumpy" onChange={this.onChange} />{' '}
                                            Grumpy
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_grumpy.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="2" value="overwhelmed" onChange={this.onChange} />{' '}
                                            Overwhelmed
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_overwhelmed.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="10" value="positive" onChange={this.onChange} />{' '}
                                            Positive
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_calm.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="1" value="negative" onChange={this.onChange} />{' '}
                                            Negative
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_calm.svg" alt="sad" />
                                    </FormGroup>
                                    <FormGroup check className="mb-2">
                                        <Label check className="mr-2">
                                            <Input type="radio" name="mood" data-key="2" value="tired" onChange={this.onChange} />{' '}
                                            Tired
                                        </Label>
                                        <img className="mood-emoji" src="/images/mood_calm.svg" alt="sad" />
                                    </FormGroup>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="intensity">From 1 to 10, how {this.state.mood} do you feel?</Label>
                                <Input type="range" min="1" max="10" name="intensity" id="intensity" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="cause">What do you think is the cause why you feel {this.state.mood} today?</Label>
                                <Input type="select" name="cause" id="cause" onChange={this.onChange}>
                                    <option>Work</option>
                                    <option>Family</option>
                                    <option>Partner</option>
                                    <option>Society</option>
                                    <option>Weather</option>
                                    <option>Yourself</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                {this.state.mood_level > 5 ?

                                    <div>
                                        <Label for="gratefulness">Good mood: We’re really happy you’re having a good mood today, so we hope you can easily name 3 things that make you feel this way or you’re grateful for</Label>

                                    </div>
                                    :
                                    <div>
                                        <Label for="gratefulness">Bad mood: We all have bad days, and no matter how shitty we feel, we all have things that make us happy and should be grateful for, think well and name 3.</Label>

                                    </div>}
                                <Input type="textarea" name="gratefulness" id="gratefulness" placeholder="Today I feel grateful for.." onChange={this.onChange} />
                            
                                <Button color="dark" style={{ marginTop: '2rem' }} block>Checkin</Button>
                            </FormGroup>
                        </Form>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    mood: state.mood,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addMood })(CheckingModal)