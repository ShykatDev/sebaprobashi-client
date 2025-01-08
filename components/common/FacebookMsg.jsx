"use client";

import { CustomChat, FacebookProvider } from "react-facebook";

const FacebookMsg = () => {
  return (
    <FacebookProvider appId={process.env.APP_ID || ""} chatSupport>
      <CustomChat pageId={process.env.PAGE_ID || ""} minimized={false} />
    </FacebookProvider>
  );
};

export default FacebookMsg;
