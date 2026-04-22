interface WOWOptions {
  boxClass?: string;
  animateClass?: string;
  offset?: number;
  mobile?: boolean;
  live?: boolean;
}

interface WOWInstance {
  init(): void;
  sync(): void;
}

interface WOWConstructor {
  new (options?: WOWOptions): WOWInstance;
}

declare global {
  interface Window {
    WOW: WOWConstructor;
  }
}

export {};
