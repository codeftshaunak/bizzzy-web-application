/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { SixteenPlus2 } from "../../icons/SixteenPlus2";
import { TwelvePlus } from "../../icons/TwelvePlus";
import { TwentyFourPlus1 } from "../../icons/TwentyFourPlus1";
import { TwentyPlus } from "../../icons/TwentyPlus";

export const Avatar = ({ size, type, className }) => {
  return (
    <div
      className={`${
        type === "initials"
          ? "border-brand-colors-foreground-fg-invert"
          : type === "placeholder"
          ? "border-primitive-colors-don-t-use-these-or-edit-these-teal-teal-400"
          : ""
      } ${["initials", "placeholder"].includes(type) ? "flex" : ""} ${
        ["initials", "placeholder"].includes(type) ? "items-center" : ""
      } ${
        size === "xs" && type === "initials"
          ? "px-0 py-[4px]"
          : (size === "base" && type === "initials") ||
            (size === "base" && type === "placeholder") ||
            (size === "lg" && type === "initials") ||
            (size === "lg" && type === "placeholder") ||
            size === "sm" ||
            (size === "three-xl" && type === "initials") ||
            (size === "three-xl" && type === "placeholder") ||
            (size === "two-xl" && type === "initials") ||
            (size === "two-xl" && type === "placeholder") ||
            (size === "xl" && type === "initials") ||
            (size === "xl" && type === "placeholder")
          ? "px-[5px] py-[6px]"
          : size === "xs" && type === "placeholder"
          ? "px-[3px] py-0"
          : ""
      } ${type === "image" ? "bg-[50%_50%]" : ""} ${["initials", "placeholder"].includes(type) ? "relative" : ""} ${
        size === "base" && ["image", "placeholder"].includes(type)
          ? "w-[32px]"
          : size === "lg" && ["image", "placeholder"].includes(type)
          ? "w-[36px]"
          : size === "xl" && ["image", "placeholder"].includes(type)
          ? "w-[40px]"
          : size === "two-xl" && ["image", "placeholder"].includes(type)
          ? "w-[48px]"
          : size === "three-xl" && ["image", "placeholder"].includes(type)
          ? "w-[56px]"
          : size === "xs" && type === "initials"
          ? "w-[26px]"
          : type === "initials" && size === "sm"
          ? "w-[30px]"
          : type === "initials" && size === "base"
          ? "w-[34px]"
          : size === "lg" && type === "initials"
          ? "w-[38px]"
          : type === "initials" && size === "xl"
          ? "w-[42px]"
          : type === "initials" && size === "two-xl"
          ? "w-[50px]"
          : size === "three-xl" && type === "initials"
          ? "w-[58px]"
          : size === "xs" && type === "placeholder"
          ? "w-[24px]"
          : type === "placeholder" && size === "sm"
          ? "w-[28px]"
          : ""
      } ${["initials", "placeholder"].includes(type) ? "flex-col" : ""} ${
        type === "image" && size === "base"
          ? "bg-[url(https://c.animaapp.com/LZ3BWujk/img/ellipse-5@2x.png)]"
          : type === "image" && size === "lg"
          ? "bg-[url(https://c.animaapp.com/LZ3BWujk/img/ellipse-5-7@2x.png)]"
          : type === "image" && size === "xl"
          ? "bg-[url(https://c.animaapp.com/LZ3BWujk/img/ellipse-5-2@2x.png)]"
          : type === "image" && size === "two-xl"
          ? "bg-[url(https://c.animaapp.com/LZ3BWujk/img/ellipse-5-3@2x.png)]"
          : size === "three-xl" && type === "image"
          ? "bg-[url(https://c.animaapp.com/LZ3BWujk/img/ellipse-5-4@2x.png)]"
          : ""
      } ${
        ["sm", "xs"].includes(size)
          ? "rounded-[14px]"
          : size === "base" && ["initials", "placeholder"].includes(type)
          ? "rounded-[16px]"
          : size === "lg" && ["initials", "placeholder"].includes(type)
          ? "rounded-[32px]"
          : size === "xl" && ["initials", "placeholder"].includes(type)
          ? "rounded-[29px]"
          : size === "two-xl" && ["initials", "placeholder"].includes(type)
          ? "rounded-[37px]"
          : size === "three-xl" && ["initials", "placeholder"].includes(type)
          ? "rounded-[44px]"
          : ""
      } ${type === "image" ? "bg-cover" : ""} ${["initials", "placeholder"].includes(type) ? "gap-[10px]" : ""} ${
        type === "initials"
          ? "bg-primitive-colors-don-t-use-these-or-edit-these-teal-teal-500"
          : type === "placeholder"
          ? "bg-[color:var(--brand-colors-background-bg-primary)]"
          : ""
      } ${
        type === "initials" && ["sm", "xs"].includes(size)
          ? "border-[0.75px] border-solid"
          : (size === "base" && type === "initials") ||
            (size === "lg" && type === "initials") ||
            (size === "three-xl" && type === "initials") ||
            (size === "two-xl" && type === "initials") ||
            (size === "xl" && type === "initials")
          ? "border border-solid"
          : type === "placeholder" && ["sm", "xs"].includes(size)
          ? "border-[0.75px] border-dashed"
          : (size === "base" && type === "placeholder") ||
            (size === "lg" && type === "placeholder") ||
            (size === "three-xl" && type === "placeholder") ||
            (size === "two-xl" && type === "placeholder") ||
            (size === "xl" && type === "placeholder")
          ? "border border-dashed"
          : ""
      } ${
        size === "base" && ["image", "placeholder"].includes(type)
          ? "h-[32px]"
          : size === "lg" && ["image", "placeholder"].includes(type)
          ? "h-[36px]"
          : size === "xl" && ["image", "placeholder"].includes(type)
          ? "h-[40px]"
          : size === "two-xl" && ["image", "placeholder"].includes(type)
          ? "h-[48px]"
          : size === "three-xl" && ["image", "placeholder"].includes(type)
          ? "h-[56px]"
          : size === "xs" && type === "initials"
          ? "h-[26px]"
          : type === "initials" && size === "base"
          ? "h-[34px]"
          : size === "lg" && type === "initials"
          ? "h-[38px]"
          : type === "initials" && size === "xl"
          ? "h-[42px]"
          : type === "initials" && size === "two-xl"
          ? "h-[50px]"
          : size === "three-xl" && type === "initials"
          ? "h-[58px]"
          : size === "xs" && type === "placeholder"
          ? "h-[24px]"
          : ""
      } ${["initials", "placeholder"].includes(type) ? "overflow-hidden" : ""} ${
        ["initials", "placeholder"].includes(type) ? "justify-center" : ""
      } ${className}`}
    >
      {type === "initials" && (
        <div
          className={`w-fit text-[color:var(--primitive-colors-don-t-use-these-or-edit-these-white)] relative whitespace-nowrap ${
            size === "xl"
              ? "font-sm-regular"
              : size === "two-xl"
              ? "font-base-regular"
              : size === "three-xl"
              ? "font-lg-regular"
              : "font-xs-regular"
          } ${["sm", "xs"].includes(size) ? "mt-[-0.38px]" : ""} ${
            size === "xl"
              ? "tracking-[var(--sm-regular-letter-spacing)]"
              : size === "two-xl"
              ? "tracking-[var(--base-regular-letter-spacing)]"
              : size === "three-xl"
              ? "tracking-[var(--lg-regular-letter-spacing)]"
              : "tracking-[var(--xs-regular-letter-spacing)]"
          } ${
            size === "xl"
              ? "text-[length:var(--sm-regular-font-size)]"
              : size === "two-xl"
              ? "text-[length:var(--base-regular-font-size)]"
              : size === "three-xl"
              ? "text-[length:var(--lg-regular-font-size)]"
              : "text-[length:var(--xs-regular-font-size)]"
          } ${
            size === "xl"
              ? "[font-style:var(--sm-regular-font-style)]"
              : size === "two-xl"
              ? "[font-style:var(--base-regular-font-style)]"
              : size === "three-xl"
              ? "[font-style:var(--lg-regular-font-style)]"
              : "[font-style:var(--xs-regular-font-style)]"
          } ${
            size === "xl"
              ? "font-[number:var(--sm-regular-font-weight)]"
              : size === "two-xl"
              ? "font-[number:var(--base-regular-font-weight)]"
              : size === "three-xl"
              ? "font-[number:var(--lg-regular-font-weight)]"
              : "font-[number:var(--xs-regular-font-weight)]"
          } ${
            size === "xl"
              ? "leading-[var(--sm-regular-line-height)]"
              : size === "two-xl"
              ? "leading-[var(--base-regular-line-height)]"
              : size === "three-xl"
              ? "leading-[var(--lg-regular-line-height)]"
              : "leading-[var(--xs-regular-line-height)]"
          }`}
        >
          AN
        </div>
      )}

      {size === "xs" && type === "placeholder" && <TwelvePlus className="!relative !w-[12px] !h-[12px]" />}

      {type === "placeholder" && ["base", "lg", "sm"].includes(size) && (
        <SixteenPlus2 className="!relative !w-[16px] !h-[16px]" />
      )}

      {size === "xl" && type === "placeholder" && <TwentyPlus className="!relative !w-[20px] !h-[20px]" />}

      {type === "placeholder" && ["three-xl", "two-xl"].includes(size) && (
        <TwentyFourPlus1 className="!relative !w-[24px] !h-[24px]" />
      )}
    </div>
  );
};
