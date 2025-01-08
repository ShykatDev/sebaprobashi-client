import {
  ArrowUpOnSquareIcon,
  BriefcaseIcon,
  ClipboardDocumentIcon,
  CursorArrowRippleIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { FileInput } from "lucide-react";
import { BsCardHeading } from "react-icons/bs";

export const SideBarOptions = [
  
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: <CursorArrowRippleIcon />,
  },
  {
    title: "Loan Applications",
    url: "/dashboard/loan-applications",
    icon: <FileInput size={18}/>,
  },
  {
    title: "User Documents",
    url: "/dashboard/user-documents",
    icon: <ClipboardDocumentIcon />,
  },
  {
    title: "Avaiable Visa",
    url: "/dashboard/available-visa",
    icon: <DocumentCheckIcon />,
  },
  {
    title: "Jobs",
    url: "/dashboard/jobs",
    icon: <BriefcaseIcon />,
  },
  // {
  //   title: "Medical Report",
  //   url: "/dashboard/medical-report",
  //   icon: <DocumentTextIcon />,
  // },
  {
    title: "Complains",
    url: "/dashboard/complains",
    icon: <DocumentTextIcon />,
  },
  {
    title: "Insurances",
    url: "/dashboard/insurances",
    icon: <DocumentTextIcon />,
  },
  {
    title: "Outpass Requests",
    url: "/dashboard/outpass-requests",
    icon: <ArrowUpOnSquareIcon />,
  },
  {
    title: "Content",
    url: "/dashboard/content",
    icon: <BsCardHeading/>,
  },
];

export const NavbarOptions = [
  {
    title: "HOME",
    url: "/",
    step: 1
  },
  {
    title: "VISA_CHECK",
    url: "/visa-check",
    step: 2
  },
  {
    title: "LOAN",
    url: "/loan",
    step: 1
  },
  {
    title: "AVAILABLE_VISA",
    url: "/available-visa",
    step: 1
  },
  // {
  //   title: "MEDICAL_REPORT",
  //   url: "/medical-report",
  //   step: 2
  // },
  {
    title: "COMPLAINS",
    url: "/complains",
    step: 1
  },
  {
    title: "LIFE_SECURITY",
    url: "/life-security",
    step: 1
  },
  {
    title: "CONTACT",
    url: "/contact",
    step: 1
  },
];

export const countryOptions = [
  { label: "Malaysia", value: "malaysia" },
  { label: "Saudi Arabia", value: "saudi_arabia" },
  { label: "Kuwait", value: "kuwait" },
  { label: "Qatar", value: "qatar" },
];
