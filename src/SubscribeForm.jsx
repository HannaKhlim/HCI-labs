import { Component } from "react";
import { translations } from "./translations";

export default class SubscribeForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { subscribeModule } = translations;

    return (
      <form
        id="subscribe-form"
        className="subscribe-module__form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder={subscribeModule.emailPlaceholder}
          required
          className="subscribe-module__input input"
        />
        <button type="submit" className="btn-primary">
          {subscribeModule.cta}
        </button>
      </form>
    );
  }
}