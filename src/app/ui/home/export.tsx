"use client";

export default function Export() {
  const handleClick = () => {
    alert("You're gay");
  };
  return (
    <div className="">
      <button
        className="flex justify-between pl-1 pr-1 w-[7em] h-12 rounded-md border-[1px] border-slate-200 border-solid flex items-center justify-center"
        onClick={handleClick}
      >
        Export
        <i className="text-2xl bi bi-box-arrow-in-down"></i>
      </button>
    </div>
  );
}
