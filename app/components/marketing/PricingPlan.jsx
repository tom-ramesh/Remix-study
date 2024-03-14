import { useState } from "react";

function PricingPlan({ title, price, perks, icon }) {
  const [state, setState] = useState(0);
  const Icon = icon;

  return (
    <article>
      <header>
        <div className="icon">
          <Icon />
        </div>
        <h2>{title}</h2>
        <p>{price}</p>
      </header>
      <div className="plan-content">
        <ol>
          {perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ol>
        <div className="actions">
          <a href="/not-implemented">Learn More</a>
        </div>
      </div>
      <button onClick={() => setState((prev) => prev + 1)}>
        Added : {state}
      </button>
    </article>
  );
}

export default PricingPlan;
