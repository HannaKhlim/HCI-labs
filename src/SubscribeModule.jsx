import { Component } from "react";
import SubscribeForm from "./SubscribeForm";
import { translations } from "./translations";

export default class SubscribeModule extends Component {
  render() {
    const { subscribeModule } = translations;

    return (
      <section className="subscribe-module">
        <h2
          className="subscribe-module__header"
          dangerouslySetInnerHTML={{ __html: subscribeModule.header }}
        />
        <SubscribeForm />
      </section>
    );
  }
}