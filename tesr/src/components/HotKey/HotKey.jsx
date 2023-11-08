/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { SixteenCommand1 } from "../../icons/SixteenCommand1";

export const HotKey = ({ property1, className }) => {
  return (
    <div
      className={`inline-flex items-center p-[2px] h-[20px] rounded-[4px] bg-[color:var(--primitive-colors-don-t-use-these-or-edit-these-gray-gray-100)] relative ${className}`}
    >
      {property1 === "leading-icon" && <SixteenCommand1 className="!relative !w-[16px] !h-[16px]" />}

      <div className="font-xs-regular w-fit mt-[-1.00px] tracking-[var(--xs-regular-letter-spacing)] text-[length:var(--xs-regular-font-size)] [font-style:var(--xs-regular-font-style)] text-brand-colors-foreground-fg-secondary font-[number:var(--xs-regular-font-weight)] leading-[var(--xs-regular-line-height)] whitespace-nowrap relative">
        {property1 === "leading-icon" && <>/</>}

        {property1 === "text-only" && <>Esc</>}
      </div>
    </div>
  );
};
