import React, { Component } from 'react';
import { List, ListItem, ListItemSecondaryAction, IconButton, ListItemText, ListSubheader, Divider } from "@material-ui/core";
import { LocalBar, ChevronRight } from '@material-ui/icons';

import Loader from './Loader'


class ListeSommeliers extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(elt) {
        this.props.history.push(`/fichesommelier/${elt.key}`)
    }


    render() {
        const { users, orderedUsers } = this.props.UsersContainer.state
        const { findAll } = this.props.UsersContainer
        if (users.length && !orderedUsers.length) {
            findAll()
        }

        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        return (
            <div style={{ height: 390, overflow: "auto" }}>
                {/* Lettres de l'alphabet */}
                <List subheader={<div />}>
                    {[...alphabet].map(sectionId => (
                        <div key={`section-${sectionId}`} >
                            {sectionId === "A" ? "" : <Divider light={true} style={{ marginLeft: 80, marginRight: 80, marginTop: 20 }} />}
                            <ListSubheader style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", fontSize: 25 }}>{sectionId}</ListSubheader>

                            {/* Génération des listes de Sommeliers*/}
                            {orderedUsers
                                // {/* Ici je trie d'abord ma donnée et ensuite je filtre pour que la 1ère lettre du nom match avec la lettre courante de l'alphabet. Enfin, je map pour faire apparaître ma donnée trie au fur et à mesure dans la liste*/}
                                ? [...orderedUsers].sort((a, b) => a.name > b.name).filter(elt => sectionId === elt.name[0]).map((elt, i) => (
                                    <ListItem
                                        key={i}
                                        role={undefined}
                                        button
                                        onClick={() => this.handleClick(elt)}
                                    >
                                        <LocalBar />
                                        <ListItemText primary={`${elt.name} ${elt.firstname}`} secondary={elt.location} />
                                        <ListItemSecondaryAction>
                                            <IconButton>
                                                <ChevronRight />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                                : <Loader />}
                        </div>
                    ))}
                </List>
            </div >

        );
    }
}
export default ListeSommeliers;