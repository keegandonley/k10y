export default function BlogLayout({ children, modal }: any) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}