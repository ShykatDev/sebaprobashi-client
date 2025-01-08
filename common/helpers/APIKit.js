import HTTPKit, { client } from "./HTTPKit";

const defaultFileUploadConfig = {
  headers: { "Content-Type": "multipart/form-data" },
};

const APIKit = {
  setClientToken: HTTPKit.setClientToken,

  auth: {
    login: (payload) => {
      const url = "auth/token";
      return client.post(url, payload);
    },

    getWe: () => {
      const url = "/we";
      return client.get(url);
    },
  },

  admin: {
    getApplications: () => {
      const url = "/we/applications";
      return client.get(url);
    },
    getLoanApplications: () => {
      const url = "/we/loan";
      return client.get(url);
    },
    createJob: (payload) => {
      const url = "/we/jobs";
      return client.post(url, payload);
    },
    getAvailableVisa: () => {
      const url = "/we/available-visa";
      return client.get(url);
    },
    createAvailableVisa: (payload) => {
      const url = "/we/available-visa";
      return client.post(url, payload, defaultFileUploadConfig);
    },
    updateAvailableVisa: ( id, payload) => {
      const url = `/we/available-visa/${id}`;
      return client.patch(url, payload, defaultFileUploadConfig);
    },
    createVisa: (payload) => {
      const url = "/we/visa";
      return client.post(url, payload, defaultFileUploadConfig);
    },
    createMedicalReport: (payload) => {
      const url = "/we/medical_report";
      return client.post(url, payload, defaultFileUploadConfig);
    },
    getComplains: () => {
      const url = "/we/complains";
      return client.get(url);
    },
    getInsurances: () => {
      const url = "/we/life_securities";
      return client.get(url);
    },
    getOutpass: () => {
      const url = "/we/out-pass";
      return client.get(url);
    },
    createContent: (payload) => {
      const url = "/we/heading";
      return client.post(url, payload);
    },
    editContent: (payload, id) => {
      const url = `/we/heading/${id}`;
      return client.patch(url, payload);
    },
  },

  common: {
    getJobs: () => {
      const url = "/jobs";
      return client.get(url);
    },

    getDocuments: (params) => {
      const url = "/visa";

      return client.get(url, {
        params: {
          passport_number: params,
        },
      });
    },

    getAvailVisa: (params={}) => {
      const url = "/available-visa";
      return client.get(url, {
        params
      });
    },

    getMedicalReports: (params) => {
      const url = "/medical_reports";

      return client.get(url, {
        params: {
          passport_number: params,
        },
      });
    },

    apply: (payload, queryParams = {}) => {
      const url = "/apply";

      const config = {
        ...defaultFileUploadConfig,
        params: queryParams,
      };

      return client.post(url, payload, config);
    },

    applyLoan: (payload) => {
      const url = "/loan";
      return client.post(url, payload, defaultFileUploadConfig);
    },

    lifeSecurity: (payload) => {
      const url = "/life_security";
      return client.post(url, payload);
    },

    outPass: (payload) => {
      const url = "/out-pass";
      return client.post(url, payload);
    },


    createCompain: (payload) => {
      const url = "/complain";
      return client.post(url, payload, defaultFileUploadConfig);
    },

    getContent: () => {
      const url = `/heading`;
      return client.get(url);
    },
  },
};
export default APIKit;
