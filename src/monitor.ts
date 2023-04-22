import { init as RumAgent } from "@elastic/apm-rum";
import env from "@architecture-it/react-env";
import { ENV_APM, getApmConfig } from "@architecture-it/core";

import pkg from "../package.json";

const disableApm = env("DISABLE_APM");
const environment = env("ENV_APM") as ENV_APM;

const monitor = RumAgent({
  ...getApmConfig({
    serviceVersion: pkg.version,
    serviceName: pkg.name,
    disableApm: Boolean(disableApm),
    environment,
  }),
});

export default monitor;
