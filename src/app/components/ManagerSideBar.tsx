export default function ManagerSideBar() {
  return (
    <aside className="h-screen top-0 left-0 z-40 w-64" aria-label="Sidenav">
      <div className="py-5 px-3 h-full bg-white border-r border-gray-200">
        <div className={"text-center font-extrabold text-5xl uppercase my-5"}>
          Relaxat
        </div>
        <ul className="space-y-2">
          <li>
            <a
              href="/manager/branches"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <span className="ml-3">
                <i className="bi bi-house-door-fill me-4"></i>Branches
              </span>
            </a>
          </li>
          <li>
            <a
              href="/manager/employees"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <span className="ml-3">
                <i className="bi bi-people-fill me-4"></i>Employees
              </span>
            </a>
          </li>
          <li>
            <a
              href="/manager/services"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <span className="ml-3">
                <i className="bi bi-scissors me-4"></i>Services
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
