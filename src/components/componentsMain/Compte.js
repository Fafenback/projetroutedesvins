import React, {Component} from 'react'
import {List, ListItem, ListItemSecondaryAction, ListItemText, IconButton} from "@material-ui/core";
import {Edit, Person, Place, Mood} from "@material-ui/icons";
import Email from "@material-ui/icons/Email"

class Compte extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const tab = [this.props.firstname, this.props.name, this.props.biography, this.props.email, this.props.location]
        const test = [ < Person />, < Person />, < Mood />, < Email />, < Place />
        ]

        return (
            <List>

                {tab.map((value, i) => (
                    <ListItem key={i} role={undefined} button divider>
                        <div>{test[i]}</div>
                        <ListItemText primary={value}/>
                        <ListItemSecondaryAction>
                            <IconButton
                                aria-label="Modifier"
                                style={{
                                outline: 0
                            }}>
                                <Edit/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default Compte;