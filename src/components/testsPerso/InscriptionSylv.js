import React, {Component} from 'react';
import {auth, base} from '../../firebase/firebase'

class Inscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            passwordOne: "",
            passwordTwo: "",
            location: "",
            biography: ""
        };
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.inputChanges = this
            .inputChanges
            .bind(this)
    }
    inputChanges(e, key) {
        this.setState({[key]: e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault()
        const {history} = this.props
        const {
            email,
            passwordOne,
            passwordTwo,
            name,
            location,
            biography
        } = this.state
        if (passwordOne === passwordTwo) {
            auth
                .createUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => console.log(authUser))
            base.push(`sommeliers`, {
                data: {
                    email,
                    name,
                    location,
                    biography
                }
            })
            history.push("/")
        } else {
            return console.log("les mdp ne sont pas identiques");
        }

    }
    render() {
        return (
            <div>
                <h1>Inscription</h1>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Mon nom et prénom"
                        onChange={e => this.inputChanges(e, "name")}/>
                    <input
                        type="text"
                        name="email"
                        placeholder="Mon email"
                        onChange={e => this.inputChanges(e, "email")}/>
                    <input
                        type="text"
                        name="passwordOne"
                        placeholder="Mon mot de passe"
                        onChange={e => this.inputChanges(e, "passwordOne")}/>
                    <input
                        type="text"
                        name="passwordTwo"
                        placeholder="Retaper mon mot de passe"
                        onChange={e => this.inputChanges(e, "passwordTwo")}/>
                    <input
                        type="text"
                        name="location"
                        placeholder="Ma localisation"
                        onChange={e => this.inputChanges(e, "location")}/>
                    <textarea
                        name="biography"
                        placeholder="Ma biographie"
                        onChange={e => this.inputChanges(e, "biography")}/>
                    <button type="submit">Je m'inscris</button>
                </form>
            </div>

        );
    }
}
// Inscription.propTypes = {
//   classes: PropTypes.object.isRequired
// };
export default Inscription;