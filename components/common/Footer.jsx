import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-primary flex flex-col items-center py-4 px-6 gap-y-3">
      <Image alt="ministry" src={"/assets/bd.png"} width={50} height={50} />
      <div className="flex items-center gap-3">
        <Link href={"#"} className="text-background">
          <FaFacebook className="size-5" />
        </Link>
        <Link href={"#"} className="text-background">
          <FaInstagram className="size-5" />
        </Link>
        <Link href={"#"} className="text-background">
          <FaYoutube className="size-5" />
        </Link>
        <Link href={"#"} className="text-background">
          <FaXTwitter className="size-5" />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
        <p className="text-white text-center">© {t("LOGO.TITLE")} - 2024</p>
        <Link href={"/terms-conditions"} className="text-white hover:underline">Terms and Conditions</Link>
      </div>
    </div>
  );
};

export default Footer;
