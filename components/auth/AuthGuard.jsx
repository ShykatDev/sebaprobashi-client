"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { inject, observer } from "mobx-react";

import HTTPKit from "@/common/helpers/HTTPKit";
import APIKit from "@/common/helpers/APIKit";
import { AUTH_TOKEN_KEY } from "@/common/helpers/KeyChain";

export const setJWTokenAndRedirect = (token, redirector = () => {}) => {
  const onSuccess = (client) => {
    let token = client.defaults.headers.common["Authorization"];
    token = token.replace("Bearer ", "");
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    HTTPKit.isReady.resolve(client);
    redirector();
  };
  return APIKit.setClientToken(token)
    .then(onSuccess)
    .catch((error) => console.log(error));
};

function AuthGuard(props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();
  const [state, setState] = useState({
    isAuthenticated: false,
    hasCheckedLocalStorageToken: false,
  });

  const {
    meStore: { we },
  } = props;

  const fetchWe = () => {
    const { meStore } = props;

    const handleSuccess = ({ data }) => {
      meStore.setWe(data);
    };

    const handleFailure = (error) => {
      if (error) {
        router.push("/logout");
      }
    };

    return APIKit.auth.getWe().then(handleSuccess).catch(handleFailure);
  };

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setJWTokenAndRedirect(token)
        .then(fetchWe)
        .then(
          setState((prevState) => ({
            ...prevState,
            hasCheckedLocalStorageToken: true,
          }))
        )
        .catch((error) => {
          router.push("/admin-login");
        });
    } else {
      if (pathname && tab) {
        const nextURL = { next: pathname };
        const queryParams = new URLSearchParams(nextURL).toString();
        router.push(`/admin-login?${queryParams}?tab=${tab}`);
      } else {
        const nextURL = { next: pathname };
        const queryParams = new URLSearchParams(nextURL).toString();
        router.push(`/admin-login?${queryParams}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state.hasCheckedLocalStorageToken && we?.data?.user?.email
    ? props.children
    : null;
}

export default inject("meStore")(observer(AuthGuard));
