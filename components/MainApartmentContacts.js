import { unixToDate } from "../utils";

export default function MainApartmentContacts({ contactRequest }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className="pe-3">Requested By</td>
            <td>{contactRequest.name}</td>
          </tr>
          <tr>
            <td className="pe-3">Phone</td>
            <td>{contactRequest.phone}</td>
          </tr>
          <tr>
            <td className="pe-3">Property Type</td>
            <td>{contactRequest.listingType}</td>
          </tr>
          <tr>
            <td className="pe-3">Message</td>
            <td>{contactRequest.message}</td>
          </tr>
          <tr>
            <td className="pe-3">Submitted At</td>
            <td>{unixToDate(contactRequest.createdAt.seconds)}</td>
          </tr>
          <tr>
            <td colSpan={5}>
              <hr className="my-2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
