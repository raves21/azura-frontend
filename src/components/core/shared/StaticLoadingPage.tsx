import Waves from "./Waves";

export default function StaticLoadingPage() {
  return (
    <div className="relative grid h-screen bg-darkBg place-items-center">
      <Waves />
      <img
        src="/azura-logo-with-label.svg"
        className="size-40 sm:size-52 md:size-56"
      />
    </div>
  );
}
