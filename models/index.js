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

export class ContactRequestModel extends BaseModel {
  constructor(data) {
    super("contact_requests", data);
  }
}

export class ContactModel extends BaseModel {
  constructor(data) {
    super("contacts", data);
  }
}

export class StatusModel extends BaseModel {
  constructor(data) {
    super("statuses", data);
  }
}
