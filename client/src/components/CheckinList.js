import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { connect } from 'react-redux';
import { getMoods, deleteMood } from '../actions/moodActions';
import PropTypes from 'prop-types'

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getMoods();
    }

    onDeleteClick = (id) => {
        this.props.deleteMood(id)
    }

    render() {

        const { moods } = this.props.mood
        return(
            <Container>
                {this.props.isAuthenticated ? 
                                <ListGroup>
                                {moods.map(({_id, mood}) => (
                                        <ListGroupItem key={_id}>
                                            <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                            >
                                            &times;
                                            </Button>
                                            {mood}
                                        </ListGroupItem>
                                ))}
                        </ListGroup> : <h4 className="mb-3 ml-4">Please log in to see your list</h4>
                }


            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getMoods: PropTypes.func.isRequired,
    mood: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool

}

const mapStateToProps = (state) => ({
    mood: state.mood,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getMoods , deleteMood })(ShoppingList);