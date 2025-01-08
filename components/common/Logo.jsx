import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Logo = ({ isShowTitle = true, className }) => {
  const { t } = useTranslation();
  const title = t("LOGO.TITLE");
  

  return (
    <div className="flex items-center gap-4 lg:pb-0">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          alt="logo"
          src={"/assets/sebaprobashi.png"}
          width={500}
          height={500}
          priority
          className="w-28 lg:w-52 shrink-0"
        />
        {/* {isShowTitle && (
          <h2 className={cn("text-primary font-semibold md:text-2xl w-fit flex flex-col items-center justify-center", className)}> 
            <span className="md:text-3xl">{title}</span>
          </h2>
        )} */}
      </Link>
    </div>
  );
};

export default Logo;
