import { action, observable, computed, makeObservable, toJS } from "mobx";

import APIKit from "@/common/helpers/APIKit";

class MeStore {
  we_ = null;

  constructor() {
    makeObservable(this, {
      we_: observable,
      we: computed,
      setWe: action,
    });
  }

  fetchWe = () => {
    // Call this explicitly when new data from server is needed
    const onSuccess = ({ data }) => {
      this.setWe(data);
    };
    const onFailure = (error) => {
      if (error?.response) {
        console.warn(error?.response);
      }
    };

    return APIKit.auth.getWe().then(onSuccess).catch(onFailure);
  };

  setWe = (we) => {
    this.we_ = this.we_ ? Object.assign(this.we_, we) : we;
  };

  get we() {
    return toJS(this.we_);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MeStore();
