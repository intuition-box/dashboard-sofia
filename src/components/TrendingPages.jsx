import { trending } from '../data';
import './TrendingPages.css';

const INTENT_COLORS = {
  Work: 'var(--color-intent-work)',
  Learning: 'var(--color-intent-learning)',
  Fun: 'var(--color-intent-fun)',
  Inspiration: 'var(--color-intent-inspiration)',
};

function TrendingPages() {
  return (
    <section className="trending">
      <div className="trending__inner">
        <div className="trending__header">
          <h2 className="trending__title">Trending Pages</h2>
          <div className="trending__filters">
            <button className="trending__filter trending__filter--active">Sort Rate</button>
            <button className="trending__filter">Explorers</button>
          </div>
        </div>

        <div className="trending__grid">
          {trending.map((item, i) => (
            <div className="trending__card" key={i} data-intent={item.intent.toLowerCase()}>
              <div className="trending__card-top">
                <span className="trending__card-title">{item.title}</span>
                <span className="trending__card-badge">{item.badge}</span>
              </div>
              <div className="trending__card-bottom">
                <span
                  className="trending__intent"
                  style={{ color: INTENT_COLORS[item.intent], borderColor: INTENT_COLORS[item.intent] }}
                >
                  {item.intentLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingPages;
