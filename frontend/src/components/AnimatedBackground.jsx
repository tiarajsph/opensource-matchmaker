import { useEffect } from "react";

function AnimatedBackground() {
  useEffect(() => {
    const handleMove = (e) => {
      const glow = document.getElementById("glow");

      if (glow) {
        glow.style.left = e.clientX - 80 + "px";
        glow.style.top = e.clientY - 80 + "px";
      }
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#22c55e10_1px,transparent_1px),linear-gradient(to_bottom,#22c55e10_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute inset-0 -z-10 bg-green-500 opacity-10 blur-3xl animate-pulse" />

      <div
        id="glow"
        className="fixed w-40 h-40 bg-green-500 opacity-20 blur-3xl rounded-full pointer-events-none"
      />
    </>
  );
}

export default AnimatedBackground;