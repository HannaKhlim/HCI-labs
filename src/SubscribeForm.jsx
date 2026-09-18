import { translations } from "./translations";

export default function SubscribeForm() {
  const { subscribeModule } = translations;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      id="subscribe-form"
      className="subscribe-module__form"
      onSubmit={handleSubmit}
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
