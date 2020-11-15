declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DATABASE: string;
    DATABASE_PASSWORD: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    PORT: string;
    // ...
  }
}
