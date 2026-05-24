import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB0tDIu8q9YMEeXb9LvHr9ori4rA80dvb0',
  authDomain: 'greengigafrica-f6260.firebaseapp.com',
  projectId: 'greengigafrica-f6260',
  storageBucket: 'greengigafrica-f6260.firebasestorage.app',
  messagingSenderId: '670474584498',
  appId: '1:670474584498:web:ce0b71e058c97f7a3f64ab',
  measurementId: 'G-P4QCDEF0WN',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
