import Link from "next/link";

export default function Registration() {
  return (
    <div className="container-lg py-4">
      <div className="max-width-680 mx-auto px-3 py-4 shadow-sm rounded-5">
        <h1 className="h2 mb-4">Registration</h1>
        <p className="mb-1">No registration is required to use this service.</p>
        <p className="mb-1">
          Just{" "}
          <Link href="/">
            <a className="text-dark">Login</a>
          </Link>{" "}
          with your Google or Facebook account
        </p>
        <p>
          You can use the service without loging in, but you will not be able to
          use the service for any of the following reasons:
        </p>
        <ul>
          <li>Adding new Advertisements to the service.</li>
          <li>Liking or disliking advertisements.</li>
          <li>Giving a rating to advertisements.</li>
        </ul>
      </div>
    </div>
  );
}
