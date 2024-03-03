import NavBar from "../ui/nav-bar";
import SideBar from "../ui/side-bar";
import Calendar from "./calendar";

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
