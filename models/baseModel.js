import { db } from "../firebase/clientApp";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

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

  async save() {
    this.setCreatedAt(new Date());
    this.setUpdatedAt(new Date());
    return await addDoc(collection(this.db, this.collectionName), this.data);
  }

  async update() {
    this.setUpdatedAt(new Date());
    const docSnap = await updateDoc(
      doc(this.db, this.collectionName, this.getId()),
      this.data
    );
    console.log("---- docSnap", docSnap);
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
    const query = query(
      collection(this.db, this.collectionName),
      where(`${key}`, "==", this.get(key))
    );
    return await getDocs(query);
  }
}

export default BaseModel;
