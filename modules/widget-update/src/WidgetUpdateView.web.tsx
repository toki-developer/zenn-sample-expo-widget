import * as React from 'react';

import { WidgetUpdateViewProps } from './WidgetUpdate.types';

export default function WidgetUpdateView(props: WidgetUpdateViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
