import { useRef, useState } from "react";

export default function MainContainer({children, isFooter}) {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollRef = useRef(null);
  const showScrollBorder = () => {
    if (scrollRef.current.scrollTop > 25) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={showScrollBorder}
      className={
        "overflow-y-auto mainContent no-scrollbar mt-[88px] mb-[82px] px-[80px] w-full flex flex-col items-center" +
        (isScrolled ? " mainContentScrolled" : " mainContent")
      }
    >
      {children}
    </div>
  );
}
