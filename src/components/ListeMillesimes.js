import React, { Component } from 'react';
import Loader from './Loader'
import { List, ListItem, ListItemSecondaryAction, IconButton, ListItemText, ListSubheader, Divider } from "@material-ui/core";
import { LocalBar, ChevronRight } from '@material-ui/icons';


class ListeMillesimes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(elt) {
        this.props.history.push(`/liste/${elt.key}`)
    }

    render() {
        const { wines, orderedWinesByMillesimes } = this.props.WinesContainer.state;
        const { byMillesimes } = this.props.WinesContainer
        if (wines.length && !orderedWinesByMillesimes.length) {
            byMillesimes()
        }


        const datesAnnees = [...orderedWinesByMillesimes].map(elt => elt.annee).sort((a, b) => a - b)
        // console.log([...datesAnnees].map(elt => elt))

        return (
            <div style={{ height: 390, overflow: "auto" }}>
                {/* Lettres de l'alphabet */}
                <List subheader={<div />}>
                    {[...datesAnnees].map(sectionYear => (
                        <div key={`section-${sectionYear}`} >
                            <Divider light={true} style={{ marginLeft: 80, marginRight: 80, marginTop: 20 }} />
                            <ListSubheader style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", fontSize: 25 }}>{sectionYear}</ListSubheader>

                            {/* Génération des listes de Sommeliers*/}
                            {orderedWinesByMillesimes
                                // {/* Ici je trie d'abord ma donnée et ensuite je filtre pour que la 1ère lettre du nom match avec la lettre courante de l'alphabet. Enfin, je map pour faire apparaître ma donnée trie au fur et à mesure dans la liste*/}
                                ? [...orderedWinesByMillesimes].sort((a, b) => a.annee - b.annee).filter(elt => sectionYear === elt.annee).map((elt, i) => (
                                    <ListItem
                                        key={i}
                                        role={undefined}
                                        button
                                        onClick={() => this.handleClick(elt)}
                                    >
                                        <LocalBar />
                                        <ListItemText primary={elt.titre} secondary={elt.annee} />
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
            </div>
        );
    }
}
export default ListeMillesimes;