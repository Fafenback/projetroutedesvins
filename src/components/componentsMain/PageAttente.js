import React, { Component } from 'react'
import FicheVin from './FicheVin';


class PageAttente extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        // console.log(this.props.match.params);
        const user = this.props
        return (
            <div>
                {this.props.user ? <FicheVin all={user} /> : <p>Chargement</p>}
                {/* <FicheVin /> */}


            </div>


        );
    }
}

export default PageAttente;