import { asClass } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import EmailSubscriber from "../app/features/example/subscribers/email.subscriber";
import { Container } from "../container";
// SUBSCRIBERS_IMPORTS

export async function registerSubscribers<T>(
  container: Container<T>,
): Promise<Container<T & Record<"eventSubscribers", any[]>>> {
  return container.register({
    eventSubscribers: asArray<any>([
      asClass(EmailSubscriber).singleton(),
      // SUBSCRIBERS_SETUP
    ]),
  });
}
