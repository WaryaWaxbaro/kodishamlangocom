import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ContactRequestModel } from "../models";
import { validateEmail } from "../utils";
import { useUser } from "../context/userContext";

const contactRequestData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactRequestForm({ listing, listingType }) {
  const [contactRequest, setContactRequest] = useState(contactRequestData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentUser } = useUser();

  useEffect(() => {
    const createContactRequest = async () => {
      const cRequest = await new ContactRequestModel({
        ...contactRequest,
        listingId: listing.mId,
        userId: listing.userId,
        listingType,
      }).save();
      if (cRequest.id) {
        setIsSubmitted(true);
        setContactRequest(contactRequestData);
        toast.success("Your request has been sent successfully");
      } else {
        toast.error("Something went wrong");
      }
      setIsSubmitting(false);
    };
    if (isSubmitting) {
      createContactRequest();
    }
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactRequest({ ...contactRequest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !contactRequest.name ||
      !contactRequest.email ||
      !contactRequest.phone ||
      !contactRequest.message
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!validateEmail(contactRequest.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (currentUser && currentUser.mId === listing.userId) {
      toast.error("You can't contact yourself");
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <div className="w-100 mt-3">
      {isSubmitting ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {isSubmitted ? (
            <div className="d-flex align-items-center justify-content-center">
              <p className="fs-12 text-success">
                Your Request has been recieved
              </p>
            </div>
          ) : (
            <form>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  name="name"
                  value={contactRequest.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Phone Number"
                  name="phone"
                  value={contactRequest.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone Number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={contactRequest.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Message"
                  id="message"
                  name="message"
                  value={contactRequest.message}
                  onChange={handleChange}
                  style={{ height: "120px" }}
                ></textarea>
                <label htmlFor="message">Message</label>
              </div>
              <div className="d-grid">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn btn-primary text-light fs-18 rounded-0"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
