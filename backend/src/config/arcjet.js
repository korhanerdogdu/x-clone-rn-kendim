import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ENV } from "./env.js";

// initialize Arcjet with security rules
export const aj = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // shield protects your app from common attacks e.g. SQL injection, XSS, CSRF attacks
    shield({ mode: "LIVE" }),

    // bot detection - disabled for mobile app compatibility
    // Mobile apps (Expo/React Native) are flagged as bots by default
    detectBot({
      mode: "DRY_RUN", // changed from LIVE to allow mobile app requests
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),

    // rate limiting with token bucket algorithm
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // tokens added per interval
      interval: 10, // interval in seconds (10 seconds)
      capacity: 15, // maximum tokens in bucket
    }),
  ],
});
