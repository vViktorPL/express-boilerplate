import { Event, EventSubscriberInterface, EventSubscribersMeta } from "@tshio/event-dispatcher";

/**
 * Example subscriber
 */
export default class EmailEventSubscriber implements EventSubscriberInterface {
  public constructor(private dependencies: Dependencies) {}

  /**
   * Register events and listeners
   * @example
   * return [
   *  { 'name': 'TestEvent', method: 'sendEmail' }
   * ]
   */
  getSubscribedEvents(): EventSubscribersMeta[] {
    return [{ name: "UserLoggedIn", method: "logUserLogin" }];
  }

  public async logUserLogin(event: Event) {
    this.dependencies.logger.info("User logged in", event.payload);
  }
}
