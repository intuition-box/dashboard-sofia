import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsRibbon from './components/StatsRibbon';
import Leaderboard from './components/Leaderboard';
import TrendingPages from './components/TrendingPages';
import HowRewards from './components/HowRewards';
import FooterCTA from './components/FooterCTA';
import Grainient from './components/Grainient';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true">
        <Grainient />
      </div>
      <Navbar />
      <Hero />
      <StatsRibbon />
      <Leaderboard />
      <TrendingPages />
      <HowRewards />
      <FooterCTA />
    </div>
  );
}

export default App;
