import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./test-utils/mocks/handlers";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

jest.mock("./msalInstance", () => ({
  msalInstance: {
    getActiveAccount: () => ({}),
    acquireTokenSilent: () => Promise.resolve({ accessToken: "token-ejemplo" }),
  },
}));
