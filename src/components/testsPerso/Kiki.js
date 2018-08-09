import React, { Component } from 'react';
import { db } from '../firebase/firebase';

class Kiki extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        return db.ref("/sommeliers").once("value", (snapshot) => snapshot.val())
        // user.then(user => {
        //     db.ref(`/users/${uid}/messages/${Date.now()}`).set({
        //         timestamp: Date.now(),
        //         date,
        //         hours,
        //         message,
        //         uid,
        //         author: user.pseudo
        //     })
        // })
    }
    render() {
        return (
            <div>

            </div>

        );
    }
}

export default Kiki;