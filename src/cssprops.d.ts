import 'react';

declare module 'react' {
  interface CSSProperties {
    anchorName?: string;
    positionAnchor?: string;
  }
}
