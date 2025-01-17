import firebase from 'firebase/app';
import { LoadingHook } from '../util';
export declare type Options = {
    snapshotListenOptions?: firebase.firestore.SnapshotListenOptions;
};
export declare type DataOptions = Options & IDOptions;
export declare type OnceOptions = {
    getOptions?: firebase.firestore.GetOptions;
};
export declare type OnceDataOptions = OnceOptions & IDOptions;
export declare type Data<T = firebase.firestore.DocumentData, IDField extends string = '', RefField extends string = ''> = T & Record<IDField, string> & Record<RefField, string>;
export declare type CollectionHook<T = firebase.firestore.DocumentData> = LoadingHook<firebase.firestore.QuerySnapshot<T>, firebase.FirebaseError>;
export declare type CollectionDataHook<T = firebase.firestore.DocumentData, IDField extends string = '', RefField extends string = ''> = LoadingHook<Data<T, IDField, RefField>[], firebase.FirebaseError>;
export declare type DocumentHook<T = firebase.firestore.DocumentData> = LoadingHook<firebase.firestore.DocumentSnapshot<T>, firebase.FirebaseError>;
export declare type DocumentDataHook<T = firebase.firestore.DocumentData, IDField extends string = '', RefField extends string = ''> = LoadingHook<Data<T, IDField, RefField>, firebase.FirebaseError>;
