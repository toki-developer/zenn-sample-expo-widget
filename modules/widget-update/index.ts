// Reexport the native module. On web, it will be resolved to WidgetUpdateModule.web.ts
// and on native platforms to WidgetUpdateModule.ts
export { default } from './src/WidgetUpdateModule';
export { default as WidgetUpdateView } from './src/WidgetUpdateView';
export * from  './src/WidgetUpdate.types';
