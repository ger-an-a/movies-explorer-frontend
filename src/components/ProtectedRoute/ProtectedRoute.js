import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
    return (
        <Route path={props.path}>
            {() =>
                props.loggedIn ? (
                    <>
                        {props.children}
                        <Redirect to={props.path} />
                    </>
                ) : (<Redirect to="./" />)
            }
        </Route>
    );
};

export default ProtectedRoute;