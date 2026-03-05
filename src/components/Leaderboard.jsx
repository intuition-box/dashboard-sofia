import { useState } from 'react';
import { leaderboard } from '../data';
import './Leaderboard.css';

const SORT_OPTIONS = ['Streak', 'Certifications', 'Gold', 'Pioneers'];

function Leaderboard() {
  const [sortBy, setSortBy] = useState('Certifications');

  const sorted = [...leaderboard].sort((a, b) => {
    switch (sortBy) {
      case 'Streak':
        return b.streakDays - a.streakDays;
      case 'Certifications':
        return b.certs - a.certs;
      case 'Gold':
        return b.gold - a.gold;
      case 'Pioneers':
        return (b.pioneer ? 1 : 0) - (a.pioneer ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <section className="leaderboard">
      <div className="leaderboard__inner">
        <div className="leaderboard__header">
          <h2 className="leaderboard__title">Leaderboard</h2>
          <div className="leaderboard__filters">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                className={`leaderboard__filter${sortBy === option ? ' leaderboard__filter--active' : ''}`}
                onClick={() => setSortBy(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="leaderboard__table-wrapper">
          <table className="leaderboard__table">
            <thead>
              <tr className="leaderboard__row leaderboard__row--head">
                <th className="leaderboard__cell leaderboard__cell--rank">Rank</th>
                <th className="leaderboard__cell leaderboard__cell--sort">Sort</th>
                <th className="leaderboard__cell leaderboard__cell--user">User</th>
                <th className="leaderboard__cell leaderboard__cell--streak">Streak</th>
                <th className="leaderboard__cell leaderboard__cell--certs">Certifications</th>
                <th className="leaderboard__cell leaderboard__cell--gold">Gold</th>
                <th className="leaderboard__cell leaderboard__cell--pioneer">Pioneer</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((user, i) => (
                <tr
                  key={user.rank}
                  className={`leaderboard__row${i < 3 ? ' leaderboard__row--highlighted' : ''}`}
                >
                  <td className="leaderboard__cell leaderboard__cell--rank">
                    {i + 1}
                  </td>
                  <td className="leaderboard__cell leaderboard__cell--sort">
                    <span className={`leaderboard__avatar-wrap${i === 0 ? ' leaderboard__avatar-wrap--top' : ''}`}>
                      <span className={`leaderboard__avatar leaderboard__avatar--${user.avatarColor}`} />
                    </span>
                  </td>
                  <td className="leaderboard__cell leaderboard__cell--user">
                    <span className="leaderboard__name">{user.name}</span>
                  </td>
                  <td className="leaderboard__cell leaderboard__cell--streak">
                    {user.streak}
                  </td>
                  <td className="leaderboard__cell leaderboard__cell--certs">
                    <span className="leaderboard__mono">{user.certs.toLocaleString()}</span>
                  </td>
                  <td className="leaderboard__cell leaderboard__cell--gold">
                    <span className="leaderboard__mono">{user.gold.toLocaleString()}</span>
                  </td>
                  <td className="leaderboard__cell leaderboard__cell--pioneer">
                    {user.pioneer && (
                      <span className="leaderboard__badge">Pioneer</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
