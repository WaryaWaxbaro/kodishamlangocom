import BaseModel from "./baseModel";

export class ProfileModel extends BaseModel {
  constructor(data) {
    super("profiles", data);
  }
}

export class UserModel extends BaseModel {
  constructor(data) {
    super("users", data);
  }
}

export class ApartmentModel extends BaseModel {
  constructor(data) {
    super("apartments", data);
  }
}

export class ReviewsModel extends BaseModel {
  constructor(data) {
    super("reviews", data);
  }
}
