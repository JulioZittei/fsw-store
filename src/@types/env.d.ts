declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    HOST_URL: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_HOST_URL: string;
    NEXT_PUBLIC_STRIPE_KEY: string;
    SECRET: string;
    NEXTAUTH_SECRET: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET_KEY: string;
  }
}
