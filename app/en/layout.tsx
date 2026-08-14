import SetHtmlLang from "@/components/set-html-lang";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SetHtmlLang lang="en" />
      {children}
    </>
  );
}
