import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCThQWk5ddghbPy94ip82Cy2eD7JwLnLmg",
  authDomain: "kimjjong-toy-project.firebaseapp.com",
  databaseURL: "https://kimjjong-toy-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kimjjong-toy-project",
  storageBucket: "kimjjong-toy-project.firebasestorage.app",
  messagingSenderId: "1036380789080",
  appId: "1:1036380789080:web:bba44995e8643e4afbad2d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  constructor() {}

  getData(url: string) {
    return get(child(ref(getDatabase()), url));
  }

  setData(url: string, data: any) {
    return set(ref(database, url), data);
  }
}
