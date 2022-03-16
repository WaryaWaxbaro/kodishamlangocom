import React from "react";

export default function HeadingWithLine({ text, classNames }) {
  return <h3 className={`heading-with-line mb-4 ${classNames}`}>{text}</h3>;
}
