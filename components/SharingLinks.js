import { useState, useEffect } from "react";
import Link from "next/link";

export default function SharingLinks({ sharingInfo }) {
  const smeInfo = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${sharingInfo.url}`,
      icon: "bi bi-facebook facebook-icon",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${sharingInfo.title}&amp;url=${sharingInfo.url}`,
      icon: "bi bi-twitter twitter-icon",
    },
    {
      name: "WhatsApp",
      url: `whatsapp://send?text=${sharingInfo.title}:${sharingInfo.url}`,
      icon: "bi bi-whatsapp whatsapp-icon",
    },
    {
      name: "Fb Messenger",
      url: `messenger://share?link=${sharingInfo.url}`,
      icon: "bi bi-messenger messenger-icon",
    },
    {
      name: "Email",
      url: `mailto:?subject=${sharingInfo.title}&amp;body=${sharingInfo.url}`,
      icon: "bi bi-envelope-fill text-dark",
    },
  ];
  return (
    <div className="d-flex justify-content-center mt-3 mb-4">
      {smeInfo.map((info, index) => (
        <Link
          key={info.name}
          href={info.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <a className="d-flex align-item-center justify-content-center p-2 mx-3 fs-32">
            <i className={info.icon}></i>
          </a>
        </Link>
      ))}
    </div>
  );
}
