import { Link, Route } from "wouter";
import { HtcHd2HomeDock } from "./htc-hd2-home-dock";
import { QlocktwoClock } from "./qlocktwo-clock/qlocktwo-clock";
import { Playground } from "./playground";
import { TickerPage } from "./ticker";
import { BB10TextTransition } from "./bb10-text-transition/bb10-text-transition";
import { TextShimmer } from "./text-shimmer/text-shimmer";

export function App() {
  return (
    <div
      className="min-h-screen antialiased break-words font-sans lining-nums" /* any global text or bg color here */
    >
      <Route path="/" component={Home} />
      <main>
        <Route path="/qlocktwo-clock" component={QlocktwoClock} />
        <Route path="/htc-hd2-home-dock" component={HtcHd2HomeDock} />
        <Route path="/ticker" component={TickerPage} />
        <Route path="/bb10-text-transition" component={BB10TextTransition} />
        <Route path="/text-shimmer" component={TextShimmer} />
        <Route path="/pg" component={Playground} />
      </main>
    </div>
  );
}

const Home = () => (
  <>
    <header>
      <h1 className="font-mono text-3xl">exploring interactions</h1>
    </header>

    <main>
      <PageLink text="QLOCKTWO clock" link="/qlocktwo-clock" />
      <PageLink text="Home dock for HTC HD2" link="/htc-hd2-home-dock" />
      <PageLink text="Ticker" link="/ticker" />
      <PageLink text="BB10 Text Transition" link="/bb10-text-transition" />
      <PageLink text="Text Shimmer" link="/text-shimmer" />
    </main>
  </>
);

const PageLink = (props: { text: string; link: string }) => (
  <>
    <Link to={props.link}>
      <a className="text-blue-700 block">{props.text}</a>
    </Link>
  </>
);
