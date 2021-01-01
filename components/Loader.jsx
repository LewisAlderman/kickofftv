import SVG from "./SVG";

export function Loader() {
  return (
    <span className="relative flex items-center justify-center w-10 h-10 rounded-full loader bg-emerald-400 animate-bounce____">
      <SVG.Football className="absolute top-0 bottom-0 left-0 right-0 w-full h-full text-emerald-900 animate-spin____" />
    </span>
  )
}