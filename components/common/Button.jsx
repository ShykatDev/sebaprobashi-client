import cn from "@/common/helpers/UtilKit";

const Button = ({ children, type, className }) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full bg-primary text-white p-3 rounded-md font-semibold focus:ring-2",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
