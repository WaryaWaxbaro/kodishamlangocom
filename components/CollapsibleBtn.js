import { useState } from "react";

export default function CollapsibleBtn({ id }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <button
      onClick={handleClick}
      className="btn btn-transparent no-shadow-btn"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#collapse_${id}`}
      aria-expanded="false"
      aria-controls={`collapse_${id}`}
    >
      {isOpen ? (
        <i className="bi bi-dash-circle text-danger"></i>
      ) : (
        <i className="bi bi-plus-circle-fill text-success"></i>
      )}
    </button>
  );
}
