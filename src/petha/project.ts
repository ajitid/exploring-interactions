// https://twitter.com/ajitid/status/1361332716566843395?s=20&t=kAMUIMXIIi8qAxnqENK3CQ

import { DecelerationRate } from "./deceleration-rate";

// for px/ms, not for pts/sec
export const project = (initialVelocity: number, decelerationRate = DecelerationRate.Normal) =>
  (initialVelocity * decelerationRate) / (1 - decelerationRate);
