import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { AppHeader, AppLayout } from './components';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './index.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Tabs } from './pages/Tabs';

import {
  Naaps, NaapForm,
  Orders, OrderForm,
  Kareegars, KareegarForm, Settings,
  MemberShip,Pay,Success
} from './pages';
import { AppContext } from './context/app-context';
import { useToggle } from './helpers/util';
import { useAuth } from './context/useAuth';
import { useEffect } from 'react';
import firebase from 'firebase';
import PrivateRoute from "./pages/PrivateRoute"


const App: React.FC = () => {

  const sideMenuToggle = useToggle();
  const auth = useAuth();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      await auth.setUser(user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  
const DebugRouter = ({ children }: { children: any }) => {
  const { location } = useHistory()
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(location.state)}`,
    )
  }

  return children
}

  return (
    <AppContext.Provider value={{
      sideMenuToggle,
      auth
    }}>

      <IonApp className="bg-skin-base">
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <AppLayout>
              <AppHeader />
              <div className="flex-grow p-2 overflow-scroll">
              <DebugRouter>
              <PrivateRoute exact path="/" component={Naaps} />
              {/* <Route path="/" exact={true}>
                  <Redirect to="/login" />
                </Route> */}
            
            <Route path="/login" >
              <Login />
            </Route>

            {/* Naaps */}
            <Route path="/naaps" exact={true}>
              <Naaps />
            </Route>
            <Route path="/naap-form" exact={true}>
              <NaapForm />
            </Route>

            {/* Orders  */}
            <Route path="/orders" exact={true}>
              <Orders />
            </Route>
            <Route path="/order-form" exact={true}>
              <OrderForm />
            </Route>

            {/* Kareegars */}
            <Route path="/kareegars" exact={true}>
              <Kareegars />
            </Route>
            <Route path="/kareegar-form" exact={true}>
              <KareegarForm />
            </Route>
            <Route path="/settings" exact={true}>
              <Settings />
            </Route>
            <Route path="/membership" exact={true}>
              <MemberShip />
            </Route>
            <Route path="/pay" exact={true}>
              <Pay/>
            </Route>
            <Route path="/success" exact={true}>
              <Success/>
            </Route>

         

              </DebugRouter>
               
              </div>
              
              <div className="fixed bottom-0 z-40 w-full p-0 ">
                {auth.isAuth() && <Tabs />}
              </div>
            </AppLayout>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;


















