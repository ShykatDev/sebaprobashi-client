import clsx from "clsx";
import { format, parseISO, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

export function deferred() {
  let _deferred = {};
  _deferred.promise = new Promise(function (resolve, reject) {
    _deferred.resolve = resolve;
    _deferred.reject = reject;
  });
  return _deferred;
}

export function pick(obj, props) {
  // Create new object
  var picked = {};

  // Loop through props and push to new object
  for (let prop of props) {
    picked[prop] = obj[prop];
  }

  // Return new object
  return picked;
}

// date string {"2023-11-30T12:09:17.605163+06:00"} to "YYYY-MM-DD"
export function toYYMMDD(originalDateString) {
  // Format the date as "YYYY-MM-DD"
  if (originalDateString) {
    const formattedDate = format(parseISO(originalDateString), "yyyy-MM-dd");
    return formattedDate;
  }
}

//format date Ex. - 12 Oct, 2023
export function formatDate(inputDateStr) {
  // Parse the input date string into a JavaScript Date object
  const date = new Date(inputDateStr);

  // Define an array to hold the month abbreviations
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the day, month, and year
  const day = date.getDate();
  const month = monthAbbreviations[date.getMonth()];
  const year = date.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day} ${month}, ${year}`;

  return formattedDate;
}

export function getTimeDifference(timestamp) {
  const currentDate = new Date();
  const providedDate = new Date(timestamp);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate - providedDate) / 1000
  );

  if (timeDifferenceInSeconds < 60) {
    return "few seconds ago";
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
}

export function formatDateFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const parts = formattedDate.split(" ");
  const month = parts[0];
  const day = parts[1].slice(0, -1);
  const year = parts[2];

  return `${day} ${month}, ${year}`;
}

export function formatCurrency(amount) {
  // moneyAmount
  const [integerPart, _] = amount?.toString()?.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

  return formattedInteger;
}

//RECRUITER VST TAB EXTRA FUNCTIONS HERE

export function timeStringToSeconds(timeString) {
  if (timeString?.length > 0) {
    const [hours, minutes, seconds] = timeString?.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
}

export function toISOFormatDateTime(publish_date, publish_time) {
  let [datePart, timePart] = publish_date.split("T");
  if (!timePart) {
    timePart = "00:00:00.000Z";
  }
  const combinedDateTime = `${datePart}T${publish_time}:00`;
  const dateObj = new Date(combinedDateTime);
  return dateObj.toISOString();
}

export function formattedTimeFromSeconds(seconds) {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${
      String(remainingSeconds).length < 2 ? "0" : ""
    }${remainingSeconds}s`;
  } else {
    return `${String(seconds).length < 2 ? "0" : ""}${seconds}s`;
  }
}

export function calculateTimeElapsed(startTime, endTime) {
  const startTimeObj = new Date(`1970-01-01T${startTime}`);
  const endTimeObj = new Date(`1970-01-01T${endTime}`);
  const timeDifference = endTimeObj - startTimeObj;
  const newTimeObj = new Date(timeDifference);
  const hours = newTimeObj.getUTCHours();
  const minutes = newTimeObj.getUTCMinutes();
  const seconds = newTimeObj.getUTCSeconds();

  const resultTimeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return resultTimeString;
}

// Get date from timestamp in Day Month, Year format
export function getFormattedDateFromTimeStamp(date) {
  return date ? format(new Date(date), "PP") : ""; // Day Month, Year
}

// Formats the date range from a start date to an end date, displaying "Present" if the end date is in the future
export function formatDateRange(start_date, end_date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const currentDate = new Date();

  const startMonth = months[startDate.getMonth()];
  const formattedStartYear = startDate.getFullYear();

  // If the end date is in the future compared to the present date, display "Present"
  const formattedDateRange =
    endDate > currentDate
      ? `${startMonth} ${formattedStartYear} - Present`
      : `${startMonth} ${formattedStartYear} - ${
          months[endDate.getMonth()]
        } ${endDate.getFullYear()}`;

  return formattedDateRange;
}

// Get Capitalized String from an all uppercase string
export function getCapitalizedStringFromUppercaseString(string) {
  let formatted_string = string?.replace("_", "-").toLowerCase();
  formatted_string =
    formatted_string?.charAt(0).toUpperCase() + formatted_string.slice(1);
  return formatted_string;
}

// tailwindcss classNames management
export default function cn(...classnames) {
  return twMerge(clsx(classnames));
}

//convert data to duration. 10s/10m/10h -> HH:mm:ss
export function toHHMMSS(seconds) {
  var sec_num = parseInt(seconds);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

// Get Working Hours
export function convertToHours(timeString) {
  const [hours, minutes, seconds] = timeString?.split(":").map(Number);
  const totalHours = hours + minutes / 60 + seconds / 3600;
  return totalHours;
}

// Sanitize query params and return searched params
export function sanitizeParams(params) {
  // Initial params object
  const sanitizedObj = {};

  for (const key in params) {
    if (params[key]) {
      sanitizedObj[key] = params[key];
    }
  }

  return sanitizedObj;
}

// highlight search term
export function highlightSearchKey(title, searchKey) {
  const index = title.toLowerCase().indexOf(searchKey.toLowerCase());

  if (index !== -1) {
    const before = title.substring(0, index);
    const during = title.substring(index, index + searchKey.length);
    const after = title.substring(index + searchKey.length);

    return {
      before: before,
      during: during,
      after: after,
      hasSearchKey: true,
    };
  } else {
    return {
      before: title,
      during: "",
      after: "",
      hasSearchKey: false,
    };
  }
}

export function getLocalTimeFromUTC(utcTimeString) {
  if (!utcTimeString) return "";

  const utcTime = new Date(`1970-01-01T${utcTimeString}Z`);
  const offsetMinutes = utcTime.getTimezoneOffset();
  const localTime = new Date(utcTime.getTime() - offsetMinutes * 60000);
  const localTimeString = localTime.toISOString().substring(11, 19);

  return localTimeString;
}

//  Converts a time string from 24-hour format to 12-hour format with AM/PM indication. 10:00 AM
export function formatTime(time) {
  const parsedTime = parse(time, "HH:mm:ss", new Date());
  return format(parsedTime, "h:mm a");
}
export function getTimeIn12HourFormat(timeString) {
  if (timeString) {
    const [hours, minutes] = timeString.split(":");
    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? "AM" : "PM";
    const formattedTime = `${formattedHours}:${minutes} ${period}`;
    return formattedTime;
  } else {
    return "Time Invalid";
  }
}

export function generateAge(dateString) {
  if (dateString) {
    const birthDate = new Date(dateString);

    const currentDate = new Date();

    const timeDifference = currentDate - birthDate;

    const ageInYears = Math.floor(
      timeDifference / (365.25 * 24 * 60 * 60 * 1000)
    );

    return `${ageInYears} years`;
  }
  return "";
}

//converts HH:mm:ss to AM/PM format. Ex. Input: 14:30:00'. Output: "10:30 PM"
export function convertTimeToAMPMFormat(timeString) {
  const [hours, minutes] = timeString.split(":");
  let hour = parseInt(hours, 10);
  let ampm = "AM";

  if (hour >= 12) {
    hour -= 12;
    ampm = "PM";
  }

  if (hour === 0) {
    hour = 12; // 12 AM
  }

  const formattedTime = `${hour}:${minutes} ${ampm}`;
  return formattedTime;
}

export function countryCodeprefix(phone) {
  if (phone.startsWith("0")) {
    return "+880" + phone.substring(1);
  } else {
    return phone;
  }
}

export const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

export const getCurrentDomain = () => {
  const baseUrl = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? ":" + window.location.port : ""
  }`;
  return baseUrl;
};

export function getFormattedAddress(address) {
  if (!address) return "Address not set";

  let addressSections = [];

  if (address.label) addressSections.push(address.label);
  if (address.house_street) addressSections.push(address.house_street);
  if (address.upazila) addressSections.push(address.upazila.name);
  if (address.district) addressSections.push(address.district.name);
  if (address.division) addressSections.push(address.division.name);
  addressSections.push("Bangladesh");

  return [...new Set(addressSections)].join(", ");
}

// Added a copy function for the address field coz this addresses field will be changed soon.
export function getFormattedAddress2(address, hiddenTerms) {
  if (!address) return "Address not set";

  let addressSections = [];

  if (!hiddenTerms?.includes("label") && address.label)
    addressSections.push(address.label);
  if (!hiddenTerms?.includes("house/street") && address.house_street)
    addressSections.push(address.house_street);
  if (!hiddenTerms?.includes("upazilla/area") && address.upazila_obj)
    addressSections.push(address.upazila_obj.name);

  if (!hiddenTerms?.includes("district/city") && address.district_obj) {
    if (!hiddenTerms?.includes("post") && address.postoffice_obj) {
      addressSections.push(
        address.district_obj.name + "-" + address.postoffice_obj.code
      );
    } else {
      addressSections.push(address.district_obj.name);
    }
  }
  if (!hiddenTerms?.includes("division") && address.division_obj)
    addressSections.push(address.division_obj.name);

  if (!hiddenTerms?.includes("country")) addressSections.push("Bangladesh");

  return [...new Set(addressSections)].join(", ");
}

export function getFullName(fName, lName) {
  if (!fName && !lName) return "";

  let fullName = [];

  if (fName) fullName.push(fName);
  if (lName) fullName.push(lName);

  return fullName.join(" ");
}

export function YearsOfExperienceFormatter(min_experience, max_experience) {
  return min_experience && max_experience
    ? `${min_experience} - ${max_experience} Years`
    : !min_experience && max_experience
    ? `0 - ${max_experience} Years`
    : min_experience && !max_experience
    ? `${min_experience} Years`
    : "N/A";
}

export function getFileNameFromPath(filePath) {
  return filePath.split("/").pop().replaceAll("_", " ");
}

export function getFileNameFromMediaFile(mediaFile) {
  if (mediaFile?.file) {
    return getFileNameFromPath(mediaFile.file);
  }

  if (mediaFile?.twilio_video) {
    return "Video Resume.mp4";
  }

  if (mediaFile?.image) {
    return getFileNameFromPath(mediaFile.image);
  }

  return "Unknown File";
}

export function getPassingYearText(education) {
  if (!education) return "Education info not found";
  if (education.is_current_student) return "Currently Studying";
  if (education.passing_year) return education.passing_year;
  return "Passing year not set";
}

export function formatWorkExperience(workExperience) {
  if (!workExperience) return "Not Set";

  const years = Math.floor(workExperience);
  const months = Math.round((workExperience - years) * 12);

  let formattedString = "";
  if (years > 0) {
    formattedString += years === 1 ? "1 year" : `${years} years`;
  }
  if (months > 0) {
    if (formattedString !== "") {
      formattedString += " ";
    }
    formattedString += months === 1 ? "1 month" : `${months} months`;
  }

  return formattedString;
}

export function hasAccess(role, task) {
  const restrictions = {
    OWNER: ["update_or_delete_owner"],
  };

  restrictions.ADMIN = [...restrictions.OWNER, "update_or_delete_admin"];

  restrictions.HR = [
    ...restrictions.ADMIN,
    "create_owner",
    "update_or_delete_owner",
  ];

  restrictions.HR_MEMBER = [
    ...restrictions.HR,
    "invite_member",
    "delete_job",
    "edit_organization",
  ];

  return restrictions[role].includes(task) ? false : true;
}

export function accessToUpdateOrgMember(myRole, memberRole) {
  let restrictions = {
    OWNER: [],
    ADMIN: ["OWNER", "ADMIN"],
    HR: ["OWNER", "ADMIN", "HR"],
    HR_MEMBER: ["OWNER", "ADMIN", "HR", "HR_MEMBER"],
  };

  return restrictions[myRole]?.includes(memberRole) ? false : true;
}

export function createOrderingString(str, orderingStr) {
  let result;
  if (str.includes(orderingStr)) {
    result = str.includes(`-${orderingStr}`)
      ? str.replace(`-${orderingStr}`, orderingStr)
      : str.replace(orderingStr, `-${orderingStr}`);
  } else {
    result = `${orderingStr},${str}`;
  }

  return result;
}

export function getAsciiSymbol(number) {
  if (number >= 1 && number <= 26) {
    return String.fromCharCode(number + 64);
  } else {
    return "Invalid input. Please enter a number between 1 and 26.";
  }
}

export function modifyQuestionsArray(questions) {
  return questions.map((question) => {
    if (question.has_option) {
      question.options = Object.entries(question.options).map(
        ([value, label]) => ({
          value,
          label,
        })
      );
    }
    return question;
  });
}

export const formatTimer = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export function getTimeFormTimer(timeText) {
  let [hours, minutes, seconds] = timeText.split(":").map(Number);

  // Convert hours to minutes
  minutes += hours * 60;

  // Format the output
  let formattedTime = "";
  if (minutes > 0) {
    formattedTime += minutes + "m ";
  }
  if (seconds > 0 || (minutes === 0 && seconds === 0)) {
    formattedTime += seconds + "s";
  }
  return formattedTime.trim();
}

export const checkPermission = (hasAccess, currentPackage) => {
  if (!currentPackage) return false;
  const permissions = hasAccess.includes(currentPackage);
  return permissions;
};

export const processtext = (data) => data.toLowerCase().split("_").join(" ");

export function convertDaysToYears(days) {
  const daysInYear = 365;
  const years = days / daysInYear;
  const roundedYears = parseFloat(years.toFixed(1));

  // Determine the correct singular or plural form
  const yearLabel =
    roundedYears === 1.0 || roundedYears < 1.0 ? "year" : "years";

  return `${roundedYears} ${yearLabel}`;
}

export function objectToURLParams(obj) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      if (Array.isArray(obj[key])) {
        if (obj[key].length > 0) {
          params.append(key, obj[key].join(","));
        }
      } else if (typeof obj[key] === "object" && obj[key].value !== undefined) {
        params.append(key, obj[key].value);
      } else {
        params.append(key, obj[key]);
      }
    }
  }

  return params.toString();
}

// //convert string python string data to formate object.
const serializePythonStringData = (data) => {
  return JSON.stringify(
    data,
    (key, value) => {
      if (value instanceof Date) {
        // Format date as DD-MM-YYYY
        const day = String(value.getDate()).padStart(2, "0");
        const month = String(value.getMonth() + 1).padStart(2, "0");
        const year = value.getFullYear();
        return `${day}-${month}-${year}`;
      }
      if (key === "salary" && typeof value === "number") {
        return value.toFixed(2); // Ensure salary is formatted to 2 decimal places
      }
      return value; // Return the value as is for other types
    },
    4
  );
};

export const convertPythonDictStringToJSObject = (str) => {
  if (str) {
    str = str
      .replace(/datetime\.date\(([^)]+)\)/g, '"$1"')
      .replace(/Decimal\('([^']+)'\)/g, "$1")
      .replace(/'/g, '"');

    const parsedData = JSON.parse(str, (key, value) => {
      if (/^\d{4}, \d{1,2}, \d{1,2}$/.test(value)) {
        const [year, month, day] = value.split(", ").map(Number);
        return new Date(year, month - 1, day);
      }
      return value;
    });

    // Use serializeData to format the parsed data
    return JSON.parse(serializePythonStringData(parsedData));
  }

  return "Invalid data type";
};

export function formatSalary(amount) {
  const amountStr = amount.toString();
  const lastThree = amountStr.substring(amountStr.length - 3);
  const otherNumbers = amountStr.substring(0, amountStr.length - 3);
  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  return formatted.startsWith(",") ? formatted.substring(1) : formatted;
}

export const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  let hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
  return formattedTime;
};
