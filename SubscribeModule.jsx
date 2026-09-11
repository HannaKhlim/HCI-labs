import SubscribeForm from "./SubscribeForm";
import { translations } from "./translations";

export default function SubscribeModule() {
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
