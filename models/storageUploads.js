import { storage } from "../firebase/clientApp";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  list,
  listAll,
  deleteObject,
  getBlob,
  getStream,
} from "firebase/storage";

import { randomKeys } from "../utils";

export default class StorageUploads {
  constructor(fullPath, files) {
    this.fullPath = fullPath;
    this.files = files;
    this.storage = storage;
  }

  async uploadResumable(fileLevel = "deep") {
    let status = [];
    return Promise.all(
      Array.from(this.files).map(async (file) => {
        let filePath =
          fileLevel === "deep"
            ? `${this.fullPath}/${randomKeys(20)}`
            : this.fullPath;
        let storageRef = ref(this.storage, `${filePath}`);
        return new Promise((resolve, reject) => {
          let statusInfo = {
            progress: 0,
            error: null,
            downloadURL: null,
            fileName: file.name,
          };
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              statusInfo.progress = progress;
            },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              statusInfo.error = error.code;
              resolve({ error: error.code, downloadURL: null });
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                statusInfo.downloadURL = downloadURL;
                resolve({ downloadURL, error: null });
              });
            }
          );
        });
      })
    )
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  async getListAll() {
    const listRef = ref(this.storage, this.fullPath);
    const res = await listAll(listRef);
    const data = res.items.map((itemRef) => {
      return itemRef;
    });
    return Promise.all(
      data.map(async (doc) => {
        const { _location } = doc;
        const { path_ } = _location;
        const imageUrl = await getDownloadURL(doc);
        const obj = { imageUrl, path_ };
        return new Promise((resolve, reject) => {
          resolve(obj);
        });
      })
    )
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async getListByBlob() {
    const listRef = ref(this.storage, this.fullPath);
    const res = await listAll(listRef);
    const data = res.items.map((itemRef) => {
      return itemRef;
    });
    return Promise.all(
      data.map(async (doc) => {
        return new Promise((resolve, reject) => {
          const res = getBlob(doc);
          resolve(res);
        });
      })
    )
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async getList() {
    const listRef = ref(this.storage, this.fullPath);
    const res = await list(listRef);
    return res;
  }

  async downloadURL() {
    try {
      const storageRef = ref(this.storage, this.fullPath);
      const res = await getDownloadURL(storageRef);
      return res;
    } catch (error) {
      return null;
    }
  }

  async deleteObject() {
    const storageRef = ref(this.storage, this.fullPath);
    const res = await deleteObject(storageRef);
    return res;
  }
}
