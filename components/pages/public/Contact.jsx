"use client";

import Logo from "@/components/common/Logo";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="w-full min-h-[calc(100vh-256px)] flex p-4 md:p-20">
      <div className="w-full bg-white/50 flex flex-col gap-y-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-primary">
              Head Office
            </h2>

            <ul>
              <li>99، Jeddah Street, near Try Restaurant, p.o. box, Al Jubail 31951, Saudi Arabia
              </li>
              <li>Rd 5، House 18, PC Culture Housing Socity, Shamoly Dhaka, 1202
              </li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl font-semibold text-primary">
              Phone
            </h2>
            <ul>
              <li className="text-lg font-normal">
                <span className="font-semibold">Email: </span>sebaprobashibd@gmail.com
              </li>
              <li className="text-lg font-normal">
                <span className="font-semibold">Hotline: </span>+966 546724876
              </li>
              <li className="text-lg font-normal">
                <span className="font-semibold">Hotline: </span>+880 1717570000
              </li>
              <li className="text-lg font-normal">
                <span className="font-semibold">Helpline: </span>+880 1812694939
              </li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl font-semibold text-primary">Email</h2>

            <p>sebaprobashibd@gmail.com</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary">Websites</h2>

            <p>https://www.sebaprobashi.com/</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary">Follow us on</h2>

            <div className="flex items-center gap-3 mt-4">
              <Link href={"#"} className="text-primary">
                <FaFacebook className="size-5" />
              </Link>
              <Link href={"#"} className="text-primary">
                <FaInstagram className="size-5" />
              </Link>
              <Link href={"#"} className="text-primary">
                <FaYoutube className="size-5" />
              </Link>
              <Link href={"#"} className="text-primary">
                <FaXTwitter className="size-5" />
              </Link>
              <Link href={"https://wa.me/message/NGNPK7GJ6JZNN1"} target="_blank" className="text-primary">
                <FaWhatsapp className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Logo/>
      </div>
    </div>
  );
};

export default Contact;
