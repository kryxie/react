import axios, {AxiosRequestConfig} from 'axios';
import config from "./config";
import Token from "./token";

function tokenInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig {

    requestConfig.headers['X-Parse-Application-Id'] = config.appId;
    requestConfig.headers['X-Parse-REST-API-Key'] = config.appKey;

    if (Token.isAuthenticated()) {
        requestConfig.headers['X-Parse-Session-Token'] = Token.getToken();
    }

    return requestConfig;
}

function tokenInterceptorError(err: any): any {
    if (err.status === 401 || (err.status === 404 && err.error.code === 101)) {
        Token.deleteToken();
        throw new Error(err.error.error);
    }

    return Promise.reject(err);
}

const request = axios.create();

request.interceptors.request.use(
    (config) => tokenInterceptor(config),
    (err) => tokenInterceptorError(err)
);

export default request;
