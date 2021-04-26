import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import uuid from 'uuid';

class ShoppingList extends Component {
    state = {
        moods: [
            {id: uuid(), mood: "Angry"},
            {id: uuid(), mood: "Sad"},
            {id: uuid(), mood: "Excited"},
            {id: uuid(), mood: "Moody"}

        ]
    }

    render() {
        const { moods } = this.state
        return(
            <Container>
                <Button 
                color="dark"
                style={{marginBottom:'2rem'}}
                onClick={() => {
                    const mood = prompt('How do you feel today?')
                    if (mood) {
                        this.setState(state => ({
                            moods: [...state.moods, {id: uuid(), mood}]
                        }))
                    }
                }}
                >Add Item</Button>
                <ListGroup>
                        {moods.map(({id, mood}) => (
                                <ListGroupItem key={id}>
                                    <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={() => {
                                        this.setState(state => ({
                                            moods: state.moods.filter(mood => mood.id !== id)
                                        })) 
                                    }}
                                    >
                                    &times;
                                    </Button>
                                    {mood}
                                </ListGroupItem>
                        ))}
                </ListGroup>

            </Container>
        )
    }
}

export default ShoppingList;