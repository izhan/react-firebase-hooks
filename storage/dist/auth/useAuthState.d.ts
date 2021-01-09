import firebase from 'firebase/app';
import { LoadingHook } from '../util';
export declare type AuthStateHook = LoadingHook<firebase.User, firebase.auth.Error>;
declare const _default: (auth: firebase.auth.Auth) => [firebase.User | undefined, boolean, firebase.auth.Error | undefined];
export default _default;
