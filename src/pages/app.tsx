import { Link, Route, RouteProps } from "wouter";
import { HtcHd2HomeDock } from "./htc-hd2-home-dock";
import { QlocktwoClock } from "./qlocktwo-clock/qlocktwo-clock";
import { Playground } from "./playground";
import { TickerPage } from "./ticker";
import { BB10TextTransition } from "./bb10-text-transition/bb10-text-transition";
import { TextShimmer } from "./text-shimmer/text-shimmer";
import { SegmentedControlDemo } from "./segmented-control";
import { IndicateMoreTextByFade } from "./indicate-more-text-by-fade/indicate-more-text-by-fade";
import { ImageOutsideBounds } from "./image-outside-bounds/image-outside-bounds";
import { ReactElement } from "react";
import { StripeMenu } from "./stripe-menu";

export function App() {
  const { pageLinks, routes } = useLinks([
    { path: "/pg", component: Playground, name: "" },
    {
      path: "/qlocktwo-clock",
      component: QlocktwoClock,
      name: "QLOCKTWO clock",
    },
    { path: "/htc-hd2-home-dock", component: HtcHd2HomeDock, name: "Home dock for HTC HD2" },
    { path: "/ticker", component: TickerPage, name: "Ticker" },
    { path: "/bb10-text-transition", component: BB10TextTransition, name: "BB10 text transition" },
    { path: "/text-shimmer", component: TextShimmer, name: "Text shimmer" },
    { path: "/segmented-control", component: SegmentedControlDemo, name: "Segmented control" },
    {
      path: "/indicate-more-text-by-fade",
      component: IndicateMoreTextByFade,
      name: "Using fade to indicate there's more text",
    },
    { path: "/image-outside-bounds", component: ImageOutsideBounds, name: "Image outside bounds" },
    // TODO starts here →
    // cascade
    { path: "/stripe-menu", component: StripeMenu, name: "Stripe Menu" },
    // flex shrink josh cameau
    // zoom utils austin marbela onetab, https://twitter.com/julianlehr/status/1673416294845100033, 2d interface - that cartoon like sujith asked and that noodle guy chinese paul one
    // rotating grid austin marbela
    // https://www.youtube.com/watch?v=HvKCMYVuvRM&t=316s
    // blur + zoom + mask to reveal bubbly like (or svg filter stuff could do this?)
  ]);

  return (
    <div
      className="min-h-screen antialiased break-words font-sans lining-nums" /* any global text or bg color here */
    >
      <Route path="/" component={() => <Home pageLinks={pageLinks} />} />
      <main>{routes}</main>
    </div>
  );
}

interface HomeProps {
  pageLinks: ReactElement<PageLinkProps>[];
}

const Home = (props: HomeProps) => (
  <div className="container mx-auto py-4">
    <header className="mb-4">
      <h1 className="text-4xl font-light">Exploring Interfaces</h1>
    </header>

    <main>{props.pageLinks}</main>
  </div>
);

interface PageLinkProps {
  children: string;
  link: string;
}

const PageLink = (props: PageLinkProps) => (
  <Link to={props.link}>
    <a className="text-blue-700 block font-medium">{props.children}</a>
  </Link>
);

const useLinks = (items: { path: string; name: string; component: RouteProps["component"] }[]) => {
  const pageLinks: ReactElement<PageLinkProps>[] = items.map((item) => (
    <PageLink key={item.path} link={item.path} children={item.name} />
  ));
  const routes = items.map((item) => (
    <Route key={item.path} path={item.path} component={item.component} />
  ));
  return { pageLinks, routes };
};
