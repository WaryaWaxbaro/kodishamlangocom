import Link from "next/link";

export default function Privacy() {
  return (
    <div className="container-lg py-4">
      <div className="max-width-680 mx-auto px-3 py-4 shadow-sm rounded-5">
        <h1 className="h3 mb-3">Privacy Policy</h1>
        <p>
          Gurikiro.com respects your privacy and we are committed to protect
          your personal information. This privacy policy (“Policy”) applies to
          your use of Gurikiro.com. This Policy sets out how we collect, store,
          share and use user's personal data that we may collect from the you as
          a user when you use or interact with Gurikiro.com.
        </p>
        <ol>
          <li>
            We do not share or disclose any data that you have provided to us to
            third parties. We may however need to disclose personal information
            to the Gurikiro.com's employees who require such information to
            carry out their duties.
          </li>
          <li>
            We do not collect sensitive personal data about you. This includes
            details about your sex, ethnicity, religious or other beliefs, sex
            orientation, age. However we may collect and use statistical or
            demographic data through first party cookies (Google Analytics).
          </li>
          <li>
            We makes use of first-party cookies (Google Analytics) to collect
            Gurikiro.com analytics data, to deliver targeted services to
            Gurikiro.com's visitors based on their browsing activity.
          </li>
          <li>
            You may remove your personal data such as your name, email, phone at
            anytime by unregistering from Gurikiro.com service throught{" "}
            <Link href="/">
              <a className="text-dark">Admin section</a>
            </Link>
            .
          </li>
          <li>
            Gurikiro.com is not responsible for and gives no warranties or makes
            any representations in respect of the privacy policies or practices
            of linked or any third party or advertised web sites.
          </li>
        </ol>
        <div>
          <h3 className="h3">Security</h3>
          <p>
            Users are prohibited from violating or attempting to violate the
            security of the Gurikiro.com, including, but without limitation:
          </p>
          <ul>
            <li>
              accessing data not intended for such user or logging into a server
              or account which the user is not authorized to access;
            </li>
            <li>
              attempting to probe, scan or test the vulnerability of a system or
              network or to breach security or authentication measures without
              proper authorization;
            </li>
            <li>
              attempting to interfere with service to any user, host or network,
              including, without limitation, via means of submitting a virus to
              Gurikiro.com, overloading, "flooding", "spamming", "mail bombing"
              or "crashing";
            </li>
            <li>
              sending unsolicited email, including promotions and/or advertising
              of products or services;
            </li>
            <li>
              forging any TCP/IP packet header or any part of the header
              information in any email or newsgroup posting;
            </li>
            <li>
              deleting or revising any material posted by any other person or
              entity;
            </li>
            <li>
              using any device, software or routine to interfere or attempt to
              interfere with the proper working of this Gurikiro.com service or
              any activity being conducted on this service.
            </li>
          </ul>
          <p>
            Violations of system or network security may result in civil or
            criminal liability. Gurikiro.com will investigate occurrences, which
            may involve such violations and may involve, and cooperate with, law
            enforcement authorities in prosecuting users who are involved in
            such violations.
          </p>
        </div>
        <div>
          <h3 className="h3">Disclaimer</h3>
          <ol>
            <li>
              Gurikiro.com carries property announcements independently
              published by third parties on Gurikiro.com. Gurikiro.com is not
              involved in the buying, selling or development of the property
              process and must not be considered to be an agent, buyer and/or a
              developer with respect to the use of Gurikiro.com service.
            </li>
            <li>
              Gurikiro.com shall not be responsible for any user entering into
              agreements or making decision whatever nature in connection with
              the posting of property ads, property information, personal owned
              property information, use of financial calculators and/or the
              contents thereof and/or any other information obtained on the
              Gurikiro.com.
            </li>
            <li>
              Whilst Gurikiro.com has taken reasonable measures to ensure the
              integrity of the Gurikiro.com and its contents, no warranty,
              whether express or implied, is given that Gurikiro.com will
              operate error-free or that any files, downloads or applications
              available via Gurikiro.com are free of viruses, trojans, bombs,
              time-locks or any other data, code or harmful mechanisms which has
              the ability to corrupt or affect the operation of your system.
            </li>
            <li>
              In no event shall Gurikiro.com, and/or any third party
              contributors of material to Gurikiro.com be liable for any costs,
              expenses, losses and damages of any nature (whether direct,
              indirect, punitive, incidental, special or consequential) arising
              out of or in any way connected with your use of Gurikiro.com, your
              inability to use Gurikiro.com and/or the operational failure of
              Gurikiro.com, and whether or not such costs, expenses, losses and
              damages are based on contract, delict, strict liability or
              otherwise.
            </li>
            <li>
              Insofar as Gurikiro.com contains links to any other internet
              Websites, you acknowledge and agree that the Gurikiro.com does not
              have control over any such Website and Gurikiro.com shall
              therefore not be liable in any way for the contents of any such
              linked Gurikiro.com, nor for any costs, expenses, losses or
              damages of any nature whatsoever arising from your access and/or
              use of any such Websites.
            </li>
          </ol>
        </div>
        <div>
          <h3 className="h3">Termination</h3>
          <p>
            In addition to any other legal or equitable remedies, we may,
            without prior notice to you, immediately terminate your access to
            Gurikiro.com, any service provided under this Agreement, or revoke
            any or all of your rights granted under these Policy. Upon any
            termination of your access or any rights granted under these Policy,
            you shall immediately cease all access to and use of the
            Gurikiro.com and we shall, in addition to any other legal or
            equitable remedies, immediately revoke all password(s) and account
            identification issued to you and deny your access to and use of
            Gurikiro.com in whole or in part. Any termination of rights granted
            herein shall not affect the respective rights and obligations
            (including without limitation, payment obligations) of the parties
            arising before the date of termination. You furthermore agree that
            Gurikiro.com shall not be liable to you or to any other person as a
            result of any such suspension or termination. If you are
            dissatisfied with the Gurikiro.com or with any terms, conditions,
            rules, policies, guidelines, or practices of Gurikiro.com in
            operating Gurikiro.com, your sole and exclusive remedy is to
            discontinue using Gurikiro.com.
          </p>
          <p>
            These Policy, Terms and Conditions are subject to change without
            prior notice, from time to time in our sole discretion. We will
            notify you of amendments to these Policies, Terms and Conditions by
            publishing them at Gurikiro.com. Your continued use of the
            Gurikiro.com following said publication will mean that you accept
            and agree to the changes.
          </p>
        </div>
      </div>
    </div>
  );
}
