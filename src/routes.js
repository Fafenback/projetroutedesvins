import React from 'react';
import {Route} from 'react-router-dom'
import {Subscribe} from 'unstated'
import WinesContainer from './containers/WinesContainer'
import UsersContainer from './containers/UsersContainer'

// Tableau de route pour créer de façon dynamique les routes dans l'App Plus
// d'info :   https://reacttraining.com/react-router/web/example/route-config

/**
 *
 * @param {*} Component => Composant qui sera rendu par la Route
 * @param {*} rest => Toutes les props présentent dans la Route en + du Composant
 * @param {*} render => Il remplace Component pour qu'on est la possibilité de passer des props à notre Composant
 * @param {*} props => Représente les données de React-Router-Dom (this.props.match... this.props.history...)
 *
 */
const NewRoute = ({
    component: Component,
    subscribe: Container,
    ...rest
}) => {
    return <Route
        render=
        {props =><Subscribe to={[WinesContainer, UsersContainer]}>{(WinesContainer, UsersContainer) => <Component WinesContainer={WinesContainer} UsersContainer={UsersContainer} {...props} {...rest}/> }</Subscribe>}{...rest}/>
};

export {NewRoute};