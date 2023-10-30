import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token, req }) => {
      return token ? true : false;
    },
  },
});

export const config = { matcher: ["/orders"] };
