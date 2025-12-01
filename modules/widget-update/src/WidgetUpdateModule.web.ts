import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './WidgetUpdate.types';

type WidgetUpdateModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class WidgetUpdateModule extends NativeModule<WidgetUpdateModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(WidgetUpdateModule, 'WidgetUpdateModule');
