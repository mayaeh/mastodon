/* eslint-disable import/no-default-export */
declare module '*.avif' {
  const path: string;
  export default path;
}

declare module '*.gif' {
  const path: string;
  export default path;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}

declare module '*.png' {
  const path: string;
  export default path;
}

declare module '*.svg' {
  import type React from 'react';

  interface SVGPropsWithTitle extends React.SVGProps<SVGSVGElement> {
    title?: string;
  }

  export const ReactComponent: React.FC<SVGPropsWithTitle>;

  const path: string;
  export default path;
}

declare module '*.webp' {
  const path: string;
  export default path;
}
