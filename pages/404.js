import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="container-lg py-4">
      <div className="w-100 p-3 text-center">
        <p>The Page you're looking for is not available.</p>
        <Link href="/">
          <a className="btn btn-primary rounded-8">Go to Homepage</a>
        </Link>
      </div>
    </div>
  );
}
