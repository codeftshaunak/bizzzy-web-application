/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { SixteenSearch6 } from "../../icons/SixteenSearch6";
import { HotKey } from "../HotKey";

export const SearchBase = ({ type, size, className }) => {
  return (
    <div
      className={`w-[541px] flex items-center justify-between bg-white relative ${
        type === "simple" ? "[border-bottom-style:solid]" : ""
      } ${type === "simple" ? "border-brand-colors-outline-outline-primary" : ""} ${
        type === "simple" ? "border-b" : ""
      } ${size === "base" ? "px-[8px] py-[6px]" : size === "xl" ? "px-[12px] py-[8px]" : "p-[8px]"} ${
        size === "xl" ? "h-[40px]" : ""
      } ${type === "simple" ? "rounded-[6px]" : ""} ${className}`}
    >
      <div className="w-[212px] flex items-center gap-[8px] relative">
        <SixteenSearch6 className="!relative !w-[16px] !h-[16px]" />
        <div className="font-sm-regular mt-[-1.00px] tracking-[var(--sm-regular-letter-spacing)] text-[length:var(--sm-regular-font-size)] [font-style:var(--sm-regular-font-style)] flex-1 text-brand-colors-foreground-fg-default font-[number:var(--sm-regular-font-weight)] leading-[var(--sm-regular-line-height)] relative">
          Search here...
        </div>
      </div>
      <HotKey className="!flex-[0_0_auto]" property1="leading-icon" />
    </div>
  );
};
