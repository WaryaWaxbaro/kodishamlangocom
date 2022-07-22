import Head from "next/head";

export default function AppHead({ title, description, children }) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta property="description" content={description} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {children}
    </Head>
  );
}
