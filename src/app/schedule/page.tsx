import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";
import Calendar from "../ui/schedule/calendar";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex gap-[6rem]">
        <SideBar />
        <div className="w-full pt-12 mr-5">
          <Calendar />
        </div>
      </div>
    </>
  );
}
