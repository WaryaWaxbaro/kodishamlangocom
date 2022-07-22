import AppHead from "../components/AppHead";

export default function Terms() {
  return (
    <div className="container-lg py-4">
      <AppHead>
        <meta name="robots" content="noindex nofollow" />
      </AppHead>
      <div className="max-width-680 mx-auto px-3 py-4 shadow-sm rounded-5">
        <h1 className="h3 mb-3">Terms And Conditions</h1>
        <p>
          By using Gurikiro.com, you are indicating your acceptance to be bound
          by these terms and conditions. Gurikiro.com may revise these terms and
          conditions at any time by updating this page. You should visit this
          page periodically to review the terms and conditions, to which you are
          bound.
        </p>
        <h5 className="fs-5">Terms of Use</h5>
        <p>
          Users may not use the Website in order to transmit, distribute, store
          or destroy material:
        </p>
        <ul>
          <li>in violation of any applicable law or regulation;</li>
          <li>
            in a manner that will infringe the copyright, trademark, trade
            secret or other intellectual property rights of others or violate
            the privacy, publicity or other personal rights of others;
          </li>
          <li>that is defamatory, obscene, threatening, abusive or hateful.</li>
        </ul>
        <p>The following is prohibited with respect to Gurikiro.com:</p>
        <ul>
          <li>
            Using any robot, spider, other automatic device or manual process to
            monitor or copy any part of the Website;
          </li>
          <li>
            Using any device, software or routine or the like to interfere or
            attempt to interfere with the proper working of the Website.
          </li>
          <li>
            Taking any action that imposes an unreasonable or disproportionately
            large load on the Website infrastructure;
          </li>
          <li>
            Copying, reproducing, altering, modifying, creating derivative
            works, or publicly displaying any content from the Website without
            the Website’s prior written permission;
          </li>
          <li>
            Reverse assembling or otherwise attempting to discover any source
            code relating to the Website or any tool therein, except to the
            extent that such activity is expressly permitted by applicable law
            notwithstanding this limitation; and
          </li>
          <li>
            Attempting to access any area of the Website to which access is not
            authorized.
          </li>
        </ul>
        <h5>Copyright and Intellectual Property Rights</h5>
        <ul>
          <li>
            All content, trademarks and data on Gurikiro.com, including but not
            limited to, software, databases, text, graphics, icons, hyperlinks,
            private information, and designs are the property of or licensed to
            Gurikiro.com.
          </li>
          <li>
            Users of Gurikiro.com are not granted a licence or any other right
            including without limitation under Copyright, Trade Mark, Patent or
            Intellectual Property Rights in/or to the content.
          </li>
        </ul>
        <p>
          These Terms and Conditions are subject to change without prior notice,
          from time to time in our sole discretion. We will notify you of
          amendments to these Terms and Conditions by publishing them at
          Gurikiro.com. Your continued use of the Gurikiro.com following said
          publication will mean that you accept and agree to the changes.
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
