import React, { Component } from 'react';
// import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getMoods, deleteMood } from '../actions/moodActions';
import PropTypes from 'prop-types'
import moment from 'moment'

class CheckinList extends Component {
    state = {
        open: false,
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    componentDidMount() {
        this.props.getMoods();
    }

    onDeleteClick = (id) => {
        this.props.deleteMood(id)
    }

    render() {

        const { moods } = this.props.mood

        return (
            <div>
                {moods.map(({ _id, mood, mood_level, intensity, cause, gratefulness, date }) => (
                    <div id="accordion">
                        <div key={_id} className="row mb-1 p-3" onClick={this.toggle}>
                            <div className="col-9 d-lg-flex justify-content-between">
                                {/* <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                    &times;
                                    </Button> */}
                                {/* <p className="mood-text">{mood}</p> */}
                                <img className="mood-emoji" src={`/images/mood_${mood}.svg`} alt="mood" />
                                <p>{mood_level}</p> 
                                <p>{intensity}</p> 
                                <p>{cause}</p>
                            </div>
                            <div className="col-3">
                                {moment(date).format('Do MMMM YYYY')}
                            </div>
                           
                            {this.state.open ?
                             <div>
                            {gratefulness}    
                            </div>  : ''
                        }
                                
                            
                        </div>
                        <div>
 
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

CheckinList.propTypes = {
    getMoods: PropTypes.func.isRequired,
    mood: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool

}

const mapStateToProps = (state) => ({
    mood: state.mood,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getMoods, deleteMood })(CheckinList);