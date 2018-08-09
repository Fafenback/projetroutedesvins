import React, {Component} from 'react';
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    IconButton,
    ListItemText,
    Divider
} from "@material-ui/core";
import {LocalBar, ChevronRight} from '@material-ui/icons';

// import Loader from './Loader'
class ListeNouveautes extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.handleClick = this
            .handleClick
            .bind(this)
    }

    handleClick(elt) {
        this
            .props
            .history
            .push(`/liste/${elt.key}`)
    }

    render() {
        const {wines, orderedWinesByMillesimes} = this.props.WinesContainer.state;
        const {byMillesimes} = this.props.WinesContainer
        if (wines.length && !orderedWinesByMillesimes.length) {
            byMillesimes()
        }

        return (
            <div
                style={{
                height: 390,
                overflow: "auto"
            }}>
                <List>
                    {orderedWinesByMillesimes.map((elt, i) => <ListItem key={i} role={undefined} button onClick={() => this.handleClick(elt)}>
                        {!elt.photo
                            ? <LocalBar/>
                            : <img
                                style={{
                                width: 35,
                                height: 35
                            }}
                                src={elt.photo}
                                alt={elt.titre}/>}
                        <ListItemText
                            primary={elt.titre}
                            secondary={`${elt.annee} - ${elt.producteur}`}/>
                        <ListItemSecondaryAction>
                            <IconButton>
                                <ChevronRight/>
                            </IconButton>
                        </ListItemSecondaryAction>
                        <Divider light/>
                    </ListItem>)}
                </List>
            </div>
        );
    }
}

export default ListeNouveautes;