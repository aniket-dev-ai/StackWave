import * as UAParser from "ua-parser-js"; // Correct way to import

export const getDeviceInfo = (userAgent) => {
  const parser = new UAParser.UAParser(userAgent);
  return {
    browser: parser.getBrowser().name || "Unknown Browser",
    os: parser.getOS().name || "Unknown OS",
    device: parser.getDevice().model || "Unknown Device",
  };
};
