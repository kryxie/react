import './index.css';

import React from "react";
import {LoginForm} from "../../components/LoginForm";
import {RouteComponentProps, withRouter} from "react-router";

const Login: React.FC<RouteComponentProps> = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="login-form-wrapper">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Log in</h2>
                                <LoginForm onSuccessLogin={() => props.history.push("/device-list")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
