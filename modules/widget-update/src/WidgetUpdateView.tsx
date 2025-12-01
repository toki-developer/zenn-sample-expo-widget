import { requireNativeView } from 'expo';
import * as React from 'react';

import { WidgetUpdateViewProps } from './WidgetUpdate.types';

const NativeView: React.ComponentType<WidgetUpdateViewProps> =
  requireNativeView('WidgetUpdate');

export default function WidgetUpdateView(props: WidgetUpdateViewProps) {
  return <NativeView {...props} />;
}
