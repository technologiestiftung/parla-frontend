import { test as base, expect } from "@playwright/test";
import { http } from "msw";
import type { MockServiceWorker } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";
import { handlers } from "./handlers";
import { handlersWithErrors } from "./handlers-with-errors";

const test = base.extend<{
	worker: MockServiceWorker;
	http: typeof http;
}>({
	worker: createWorkerFixture(handlers),
	http,
});

const testWithErrors = base.extend<{
	worker: MockServiceWorker;
	http: typeof http;
}>({
	worker: createWorkerFixture(handlersWithErrors),
	http,
});

export { expect, test, testWithErrors };
