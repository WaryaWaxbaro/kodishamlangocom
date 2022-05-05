import { db } from "../firebase/clientApp";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  where,
  query,
} from "firebase/firestore";

import { randomKeys } from "../utils";

class BaseModel {
  constructor(collectionName, data) {
    this.data = data;
    this.collectionName = collectionName;
    this.db = db;
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getId() {
    return this.data.id;
  }

  setId(id) {
    this.data.id = id;
  }

  setCreatedAt(createdAt) {
    this.data.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt) {
    this.data.updatedAt = updatedAt;
  }

  setModalId(id) {
    this.data["mId"] = id || randomKeys(20);
  }

  dataWithoutId(generalMId = false) {
    this.setCreatedAt(new Date());
    this.setUpdatedAt(new Date());
    if (generalMId) {
      this.setModalId(randomKeys(20));
    }
    let data = { ...this.data };
    delete data.id;
    return data;
  }

  async create() {
    const usersRef = collection(this.db, this.collectionName);
    return setDoc(doc(usersRef, this.getId()), this.dataWithoutId(true));
  }

  async save() {
    this.setCreatedAt(new Date());
    this.setUpdatedAt(new Date());
    this.setModalId(randomKeys(20));
    return await addDoc(collection(this.db, this.collectionName), this.data);
  }

  async update() {
    this.setUpdatedAt(new Date());
    const docSnap = await updateDoc(
      doc(this.db, this.collectionName, this.getId()),
      this.dataWithoutId()
    );
    return docSnap;
  }

  async getOne() {
    const docRef = doc(this.db, this.collectionName, this.getId());
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  async getAll() {
    return await collection(this.db, this.collectionName).get();
  }

  async getAllByQuery() {
    const key = Object.keys(this.data)[0];
    const q = query(
      collection(this.db, this.collectionName),
      where(`${key}`, "==", this.get(key))
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return data;
  }

  async getAllByMultipleQueries() {}
}

export default BaseModel;