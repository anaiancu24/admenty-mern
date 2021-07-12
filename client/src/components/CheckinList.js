import React, { Component } from 'react';
//import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getMoods, deleteMood } from '../actions/moodActions';
import PropTypes from 'prop-types'
import moment from 'moment'

class CheckinList extends Component {

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
                    {moods.map(({ _id, mood, date }) => (
                <div key={_id} className="row border rounded mb-1 p-3">

                        <div className="col-9">
                            {/* <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                    &times;
                                    </Button> */}
                            {mood}
                        </div>
                        <div className="col-3">
                            {moment(date).format('Do MMMM YYYY')}
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