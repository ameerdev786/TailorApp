import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// import { AuthContext } from "./Auth";
import { AppContext } from '../context/app-context';


const PrivateRoute = ({ component: RouteComponent, ...rest }:any) => {
    const { auth } = useContext(AppContext);
    // console.log(auth.isAuth(),"////////////////////////////////////////////see")
  return (
    <Route
      {...rest}
      render={routeProps =>
        auth.user? (
          <RouteComponent {...routeProps} /> 
        ) : (
          <Redirect  to="/login" />
        )
      }
    />
  );
};


export default PrivateRoute;

