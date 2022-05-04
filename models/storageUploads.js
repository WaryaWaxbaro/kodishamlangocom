import { storage } from "../firebase/clientApp";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  list,
  listAll,
  deleteObject,
} from "firebase/storage";

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
            ? `${this.fullPath}/${file.name}`
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
                console.log("File available at", downloadURL);
                statusInfo.downloadURL = downloadURL;
                resolve({ downloadURL, error: null });
              });
            }
          );
        });
      })
    )
      .then((data) => {
        console.log("values ", data[0]);
        console.log("items uploaded", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async getListAll() {
    const listRef = ref(this.storage, this.fullPath);
    const res = await listAll(listRef);
    return res;
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
