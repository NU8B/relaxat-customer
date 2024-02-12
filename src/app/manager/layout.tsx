import ManagerSideBar from "@/app/components/ManagerSideBar";

export default function ManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"flex"}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <ManagerSideBar />
      <main className="container px-5 pt-5">{children}</main>
    </section>
  );
}
