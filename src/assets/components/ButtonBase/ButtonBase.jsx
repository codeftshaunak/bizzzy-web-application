/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { SixteenCircle58 } from "../../icons/SixteenCircle58";
import { TwentyCircle65 } from "../../icons/TwentyCircle65";

export const ButtonBase = ({
  type,
  size,
  className,
  visible = true,
  divClassName,
  text = "Button text",
  visible1 = true,
  icon = <TwentyCircle65 className="!relative !w-[20px] !h-[20px]" color="#6B7280" />,
  sixteenCircle58Color = "white",
  twentyCircle65Color = "white",
  sixteenCircle58Stroke = "white",
  twentyCircle65Stroke = "white",
}) => {
  return (
    <div
      className={`items-center shadow-shadow-sm overflow-hidden justify-center relative ${
        type === "icon-only" ? "border border-solid" : ""
      } ${type === "icon-only" ? "border-brand-colors-outline-outline-secondary" : ""} ${
        size === "xs" && type === "icon-only"
          ? "w-[24px]"
          : type === "icon-only" && size === "sm"
          ? "w-[28px]"
          : type === "icon-only" && size === "base"
          ? "w-[32px]"
          : size === "lg" && type === "icon-only"
          ? "w-[36px]"
          : type === "icon-only" && size === "xl"
          ? "w-[40px]"
          : ""
      } ${type === "icon-only" ? "flex" : "inline-flex"} ${type === "icon-only" ? "gap-[10px]" : "gap-[4px]"} ${
        size === "base" && type === "default"
          ? "px-[10px] py-[6px]"
          : size === "lg" && type === "default"
          ? "px-[12px] py-[8px]"
          : size === "xl" && type === "default"
          ? "px-[14px] py-[10px]"
          : type === "icon-only" && ["sm", "xs"].includes(size)
          ? "p-[4px]"
          : type === "icon-only" && size === "base"
          ? "p-[6px]"
          : type === "icon-only" && ["lg", "xl"].includes(size)
          ? "p-[8px]"
          : "px-[8px] py-[4px]"
      } ${
        size === "sm"
          ? "h-[28px]"
          : size === "base"
          ? "h-[32px]"
          : size === "lg"
          ? "h-[36px]"
          : size === "xl"
          ? "h-[40px]"
          : "h-[24px]"
      } ${type === "default" && ["sm", "xs"].includes(size) ? "rounded-[4px]" : "rounded-[6px]"} ${
        type === "icon-only"
          ? "bg-[color:var(--brand-colors-background-bg-primary)]"
          : "bg-brand-colors-background-bg-brand"
      } ${className}`}
    >
      {type === "default" && (
        <>
          <>
            {visible && (
              <>
                <>
                  {["base", "sm", "xs"].includes(size) && (
                    <SixteenCircle58 className="!relative !w-[16px] !h-[16px]" color={sixteenCircle58Color} />
                  )}

                  {["lg", "xl"].includes(size) && (
                    <TwentyCircle65 className="!relative !w-[20px] !h-[20px]" color={twentyCircle65Color} />
                  )}
                </>
              </>
            )}
          </>
          <div
            className={`w-fit text-brand-colors-foreground-fg-invert relative whitespace-nowrap ${
              size === "xs" ? "font-xs-medium" : "font-sm-medium"
            } ${
              size === "xs"
                ? "tracking-[var(--xs-medium-letter-spacing)]"
                : "tracking-[var(--sm-medium-letter-spacing)]"
            } ${
              size === "xs" ? "[font-style:var(--xs-medium-font-style)]" : "[font-style:var(--sm-medium-font-style)]"
            } ${
              size === "xs" ? "text-[length:var(--xs-medium-font-size)]" : "text-[length:var(--sm-medium-font-size)]"
            } ${
              size === "xs"
                ? "font-[number:var(--xs-medium-font-weight)]"
                : "font-[number:var(--sm-medium-font-weight)]"
            } ${["base", "lg"].includes(size) ? "text-center" : ""} ${
              size === "xs" ? "leading-[var(--xs-medium-line-height)]" : "leading-[var(--sm-medium-line-height)]"
            } ${divClassName}`}
          >
            {text}
          </div>
          <>
            {visible1 && (
              <>
                <>
                  {["base", "sm", "xs"].includes(size) && (
                    <SixteenCircle58 className="!relative !w-[16px] !h-[16px]" color={sixteenCircle58Stroke} />
                  )}

                  {["lg", "xl"].includes(size) && (
                    <TwentyCircle65 className="!relative !w-[20px] !h-[20px]" color={twentyCircle65Stroke} />
                  )}
                </>
              </>
            )}
          </>
        </>
      )}

      {type === "icon-only" && <>{icon}</>}
    </div>
  );
};
