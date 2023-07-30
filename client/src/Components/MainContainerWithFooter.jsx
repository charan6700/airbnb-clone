import { useRef, useState } from "react";

export default function MainContainerWithFooter({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollRef = useRef(null);
  const showScrollBorder = () => {
    if (scrollRef.current.scrollTop > 0) {
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
        "overflow-y-auto mainContent no-scrollbar mt-[88px] mb-[82px] px-[80px] w-full h-full flex flex-col items-center" +
        (isScrolled ? " mainContentFooterScrolled" : " mainContentFooter")
      }
    >
      {children}
    </div>
  );
}
