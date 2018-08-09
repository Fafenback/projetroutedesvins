import React, {Component} from 'react';
import {ListItem, ListItemSecondaryAction, IconButton, ListItemText, Divider} from "@material-ui/core";
import {LocalBar, ChevronRight} from '@material-ui/icons';
import Styled from 'styled-components';

const StyledHitSearchListItem = Styled(ListItem)`
    img {
    width: 35px;
    height: 35px;
    }
`;

class HitSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleClick(hit) {
        this
            .props
            .history
            .push(`/liste/${hit.objectID}`)
    }
    render() {
        const {hit} = this.props
        return (
            <div>
                <StyledHitSearchListItem
                    role={undefined}
                    button
                    onClick={() => this.handleClick(hit)}>
                    {!hit.photo
                        ? <LocalBar/>
                        : <img src={hit.photo} alt={hit.titre}/>}
                    <ListItemText
                        primary={hit.titre}
                        secondary={`${hit.annee} - ${hit.producteur}`}/>
                    <ListItemSecondaryAction>
                        <IconButton>
                            <ChevronRight/>
                        </IconButton>
                    </ListItemSecondaryAction>
                    <Divider light/>
                </StyledHitSearchListItem>
            </div>
        );
    }
}

export default HitSearch;
