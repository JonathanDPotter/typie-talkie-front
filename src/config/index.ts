const productionURL = "https://typie-talkie-back.herokuapp.com";

const developmentURL = "http://localhost:1337";

const BASE_URL =
  process.env.NODE_ENV === "development" ? developmentURL : productionURL;

const config = { BASE_URL };
export default config;
