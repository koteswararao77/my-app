const getEnvVariables = (): {
  API_BASE_URL: string;
  ENV: "DEV" | "PROD";
  PDF_SERVICE_BASE_API: string;
  DOMAIN: string;
} => {
  if (window.location.host === "portal.onoark.com") {
    return {
      API_BASE_URL: "https://api.onoark.com/v1/",
      ENV: "PROD",
      PDF_SERVICE_BASE_API: "https://dev-pdfgen.onoark.com/pdf",
      DOMAIN: "https://portal.onoark.com",
    };
  } else {
    return {
      API_BASE_URL: "https://dev-api.onoark.com/v1/",
      ENV: "DEV",
      PDF_SERVICE_BASE_API: "https://dev-pdfgen.onoark.com/pdf",
      DOMAIN: "https://dev-portal.onoark.com",
    };
  }
};
export const SOURCE = "WEB";
export const { API_BASE_URL, ENV, PDF_SERVICE_BASE_API, DOMAIN } =
  getEnvVariables();

export const onoArkAccount = {
  accountNumber: "924020060672675",
  accountName: "ONO ARK INDIA PRIVATE LIMITED- NODAL ACCOUNT",
  bankName: "AXIS BANK",
  beneficaryName: "ONO ARK INDIA PRIVATE LIMITED- NODAL ACCOUNT",
  branchName: "CCB Bangalore",
  ifsc: "UTIB0CCH274",
};

export const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://my-app-be.onrender.com/api";

