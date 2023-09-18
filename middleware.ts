//---apply to hole site a auth function ! Cool
export { default } from "next-auth/middleware";

//----if remove down code , auth will cover all the app
export const config = { matcher: ["/manage"] };
