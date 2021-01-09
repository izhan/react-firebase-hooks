import firebase from 'firebase/app';
export declare type ValOptions = {
    keyField?: string;
    refField?: string;
};
export declare const snapshotToData: (snapshot: firebase.database.DataSnapshot, keyField?: string | undefined, refField?: string | undefined) => any;
