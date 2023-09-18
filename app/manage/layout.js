import Providers from "../providers";

export const metadata = {
  title: "مدیریت",
  description: "مدیریت | Digi Surin",
};

export default function RootLayout({ children }) {
  return <Providers>{children}</Providers>;
}
