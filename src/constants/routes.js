import withAuth from "../hoc/withAuth";
import Connexion from "../components/componentsMain/Connexion";
import CreationVins from "../components/componentsMain/CreationVins";
// import FicheVin from "../components/componentsMain/FicheVin";
import Inscription from "../components/componentsMain/Inscription";
import MonCompte from "../components/componentsMain/MonCompte";
import ListesVins from "../components/componentsMain/ListesVins";
import FicheSommelier from "../components/componentsMain/FicheSommelier";
import PageAttente from "../components/componentsMain/PageAttente";


const routes = [
  {
    path: "/",
    component: withAuth(Connexion)
  }, {
    path: "/inscription",
    component: Inscription
  }, {
    path: "/liste",
    component: withAuth(ListesVins)
  }, {
    path: "/liste/:wine",
    component: withAuth(PageAttente)
  }, {
    path: "/creationvins",
    component: withAuth(CreationVins)
  }, {
    path: "/moncompte",
    component: withAuth(MonCompte)
  }, {
    path: "/fichesommelier/:sommelier",
    component: withAuth(FicheSommelier)
  }
];

export { routes };
