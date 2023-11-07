/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { useReducer } from "react";
import { LoadingSpinner12 } from "../../icons/LoadingSpinner12";
import { LoadingSpinner14 } from "../../icons/LoadingSpinner14";
import { LoadingSpinner31 } from "../../icons/LoadingSpinner31";
import { LoadingSpinner48 } from "../../icons/LoadingSpinner48";
import { LoadingSpinner64 } from "../../icons/LoadingSpinner64";
import { TwentyCircle65 } from "../../icons/TwentyCircle65";
import { ButtonBase } from "../ButtonBase";

export const Buttons = ({
  type,
  size,
  stateProp,
  content,
  className,
  buttonBaseVisible,
  buttonBaseDivClassName,
  buttonBaseText = "Button text",
  buttonBaseTypeDefaultSizeXsClassName,
  buttonBaseIcon = <TwentyCircle65 className="!relative !w-[20px] !h-[20px]" color="#16A34A" />,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || "primary",
    size: size || "xs",
    state: stateProp || "default",
    content: content || "text-only",
  });

  return (
    <div
      className={`relative ${
        (state.content === "leading-icon" && state.state === "loading" && state.type === "secondary") ||
        (state.content === "text-only" && state.state === "loading" && state.type === "secondary") ||
        (state.content === "trailing-icon" && state.state === "loading" && state.type === "secondary")
          ? "border-brand-colors-outline-outline-secondary"
          : state.state === "active" && state.type === "primary"
          ? "border-primitive-colors-don-t-use-these-or-edit-these-teal-teal-400"
          : ""
      } ${
        state.state === "loading" && ["leading-icon", "text-only", "trailing-icon"].includes(state.content)
          ? "flex"
          : "inline-flex"
      } ${
        (state.content === "icon-only" && state.state === "active" && state.type === "primary") ||
        (state.content === "leading-icon" && state.state === "loading") ||
        (state.content === "text-only" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.state === "loading")
          ? "items-center"
          : "items-start"
      } ${
        (state.content === "leading-icon" && state.state === "loading" && state.type === "danger") ||
        (state.content === "leading-icon" && state.state === "loading" && state.type === "primary") ||
        (state.content === "leading-icon" && state.state === "loading" && state.type === "secondary") ||
        (state.content === "text-only" && state.state === "loading" && state.type === "danger") ||
        (state.content === "text-only" && state.state === "loading" && state.type === "primary") ||
        (state.content === "text-only" && state.state === "loading" && state.type === "secondary") ||
        (state.content === "trailing-icon" && state.state === "loading" && state.type === "danger") ||
        (state.content === "trailing-icon" && state.state === "loading" && state.type === "primary") ||
        (state.content === "trailing-icon" && state.state === "loading" && state.type === "secondary")
          ? "shadow-shadow-sm"
          : ""
      } ${
        (state.content === "leading-icon" && state.size === "sm" && state.state === "loading") ||
        (state.content === "leading-icon" && state.size === "xs" && state.state === "loading") ||
        (state.content === "text-only" && state.size === "sm" && state.state === "loading") ||
        (state.content === "text-only" && state.size === "xs" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.size === "sm" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.size === "xs" && state.state === "loading")
          ? "p-[4px]"
          : (state.content === "leading-icon" && state.size === "base" && state.state === "loading") ||
            (state.content === "text-only" && state.size === "base" && state.state === "loading") ||
            (state.content === "trailing-icon" && state.size === "base" && state.state === "loading")
          ? "p-[6px]"
          : (state.content === "leading-icon" && state.size === "lg" && state.state === "loading") ||
            (state.content === "leading-icon" && state.size === "xl" && state.state === "loading") ||
            (state.content === "text-only" && state.size === "lg" && state.state === "loading") ||
            (state.content === "text-only" && state.size === "xl" && state.state === "loading") ||
            (state.content === "trailing-icon" && state.size === "lg" && state.state === "loading") ||
            (state.content === "trailing-icon" && state.size === "xl" && state.state === "loading")
          ? "p-[10px]"
          : ""
      } ${
        state.size === "sm" && state.state === "loading" && ["leading-icon", "trailing-icon"].includes(state.content)
          ? "w-[112px]"
          : state.state === "loading" && state.size === "sm" && state.content === "text-only"
          ? "w-[92px]"
          : state.size === "base" &&
            state.state === "loading" &&
            ["leading-icon", "trailing-icon"].includes(state.content)
          ? "w-[116px]"
          : state.state === "loading" && state.size === "base" && state.content === "text-only"
          ? "w-[96px]"
          : (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "secondary") ||
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "secondary")
          ? "w-[124px]"
          : state.state === "loading" && state.size === "xl" && state.content === "text-only"
          ? "w-[104px]"
          : (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "secondary") ||
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "secondary") ||
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "tertiary")
          ? "w-[120px]"
          : state.size === "lg" && state.state === "loading" && state.content === "text-only"
          ? "w-[100px]"
          : state.size === "xs" &&
            state.state === "loading" &&
            ["leading-icon", "trailing-icon"].includes(state.content)
          ? "w-[101px]"
          : state.size === "xs" && state.state === "loading" && state.content === "text-only"
          ? "w-[81px]"
          : (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "tertiary")
          ? "w-[128px]"
          : ""
      } ${
        (state.content === "leading-icon" && state.state === "active") ||
        (state.content === "leading-icon" && state.state === "default") ||
        (state.content === "leading-icon" && state.state === "disabled") ||
        (state.content === "leading-icon" && state.state === "hover") ||
        (state.content === "text-only" && state.state === "active") ||
        (state.content === "text-only" && state.state === "default") ||
        (state.content === "text-only" && state.state === "disabled") ||
        (state.content === "text-only" && state.state === "hover") ||
        (state.content === "trailing-icon" && state.state === "active") ||
        (state.content === "trailing-icon" && state.state === "default") ||
        (state.content === "trailing-icon" && state.state === "disabled") ||
        (state.content === "trailing-icon" && state.state === "hover")
          ? "flex-col"
          : ""
      } ${
        (state.content === "leading-icon" &&
          state.size === "sm" &&
          state.state === "active" &&
          state.type === "primary") ||
        (state.content === "leading-icon" && state.size === "sm" && state.state === "loading") ||
        (state.content === "leading-icon" &&
          state.size === "xs" &&
          state.state === "active" &&
          state.type === "primary") ||
        (state.content === "leading-icon" && state.size === "xs" && state.state === "loading") ||
        (state.content === "text-only" &&
          state.size === "sm" &&
          state.state === "active" &&
          state.type === "primary") ||
        (state.content === "text-only" &&
          state.size === "sm" &&
          state.state === "active" &&
          state.type === "secondary") ||
        (state.content === "text-only" && state.size === "sm" && state.state === "loading") ||
        (state.content === "text-only" &&
          state.size === "xs" &&
          state.state === "active" &&
          state.type === "primary") ||
        (state.content === "text-only" &&
          state.size === "xs" &&
          state.state === "active" &&
          state.type === "secondary") ||
        (state.content === "text-only" && state.size === "xs" && state.state === "loading") ||
        (state.content === "trailing-icon" &&
          state.size === "sm" &&
          state.state === "active" &&
          state.type === "primary") ||
        (state.content === "trailing-icon" && state.size === "sm" && state.state === "loading") ||
        (state.content === "trailing-icon" &&
          state.size === "xs" &&
          state.state === "active" &&
          state.type === "primary") ||
        (state.content === "trailing-icon" && state.size === "xs" && state.state === "loading")
          ? "rounded-[4px]"
          : (state.content === "icon-only" &&
              state.size === "sm" &&
              state.state === "active" &&
              state.type === "primary") ||
            (state.content === "icon-only" &&
              state.size === "sm" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "icon-only" &&
              state.size === "xs" &&
              state.state === "active" &&
              state.type === "primary") ||
            (state.content === "icon-only" &&
              state.size === "xs" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" && state.size === "base" && state.state === "loading") ||
            (state.content === "leading-icon" && state.size === "lg" && state.state === "loading") ||
            (state.content === "leading-icon" && state.size === "xl" && state.state === "loading") ||
            (state.content === "text-only" && state.size === "base" && state.state === "loading") ||
            (state.content === "text-only" && state.size === "lg" && state.state === "loading") ||
            (state.content === "text-only" && state.size === "xl" && state.state === "loading") ||
            (state.content === "trailing-icon" && state.size === "base" && state.state === "loading") ||
            (state.content === "trailing-icon" && state.size === "lg" && state.state === "loading") ||
            (state.content === "trailing-icon" && state.size === "xl" && state.state === "loading") ||
            (state.size === "base" && state.state === "active" && state.type === "primary") ||
            (state.size === "lg" && state.state === "active" && state.type === "primary") ||
            (state.size === "xl" && state.state === "active" && state.type === "primary")
          ? "rounded-[6px]"
          : (state.content === "icon-only" &&
              state.size === "base" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "icon-only" &&
              state.size === "lg" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "icon-only" &&
              state.size === "xl" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "base" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "lg" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "xl" &&
              state.state === "active" &&
              state.type === "secondary")
          ? "rounded-[8px]"
          : ""
      } ${["leading-icon", "text-only", "trailing-icon"].includes(state.content) ? "gap-[10px]" : ""} ${
        (state.content === "leading-icon" && state.state === "loading" && state.type === "secondary") ||
        (state.content === "text-only" && state.state === "loading" && state.type === "secondary") ||
        (state.content === "trailing-icon" && state.state === "loading" && state.type === "secondary")
          ? "bg-brand-colors-foreground-fg-invert"
          : (state.content === "leading-icon" && state.state === "loading" && state.type === "primary") ||
            (state.content === "text-only" && state.state === "loading" && state.type === "primary") ||
            (state.content === "trailing-icon" && state.state === "loading" && state.type === "primary")
          ? "bg-[color:var(--brand-colors-background-bg-brand-hovered)]"
          : (state.content === "leading-icon" && state.state === "loading" && state.type === "danger") ||
            (state.content === "text-only" && state.state === "loading" && state.type === "danger") ||
            (state.content === "trailing-icon" && state.state === "loading" && state.type === "danger")
          ? "bg-[color:var(--primitive-colors-don-t-use-these-or-edit-these-red-red-500)]"
          : ""
      } ${
        (state.content === "leading-icon" && state.state === "loading" && state.type === "secondary") ||
        (state.content === "text-only" && state.state === "loading" && state.type === "secondary") ||
        (state.content === "trailing-icon" && state.state === "loading" && state.type === "secondary")
          ? "border border-solid"
          : state.state === "active" && state.type === "primary"
          ? "border-2 border-solid"
          : ""
      } ${
        (state.content === "leading-icon" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "danger") ||
        (state.content === "leading-icon" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "primary") ||
        (state.content === "leading-icon" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "tertiary") ||
        (state.content === "leading-icon" && state.size === "sm" && state.type === "secondary") ||
        (state.content === "text-only" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "danger") ||
        (state.content === "text-only" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "primary") ||
        (state.content === "text-only" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "tertiary") ||
        (state.content === "text-only" && state.size === "sm" && state.type === "secondary") ||
        (state.content === "trailing-icon" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "danger") ||
        (state.content === "trailing-icon" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "primary") ||
        (state.content === "trailing-icon" &&
          state.size === "sm" &&
          state.state === "loading" &&
          state.type === "tertiary") ||
        (state.content === "trailing-icon" && state.size === "sm" && state.type === "secondary")
          ? "h-[28px]"
          : (state.content === "leading-icon" &&
              state.size === "base" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "base" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "base" &&
              state.state === "disabled" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" && state.size === "base" && state.state === "loading") ||
            (state.content === "text-only" &&
              state.size === "base" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "base" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "base" &&
              state.state === "disabled" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "base" &&
              state.state === "hover" &&
              state.type === "secondary") ||
            (state.content === "text-only" && state.size === "base" && state.state === "loading") ||
            (state.content === "trailing-icon" &&
              state.size === "base" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "trailing-icon" &&
              state.size === "base" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "trailing-icon" &&
              state.size === "base" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" && state.size === "base" && state.type === "secondary")
          ? "h-[32px]"
          : (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "leading-icon" && state.size === "xl" && state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "text-only" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "text-only" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "text-only" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "text-only" && state.size === "xl" && state.type === "secondary") ||
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" && state.size === "xl" && state.type === "secondary")
          ? "h-[40px]"
          : (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "leading-icon" && state.size === "lg" && state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "text-only" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "text-only" && state.size === "lg" && state.type === "secondary") ||
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "trailing-icon" && state.size === "lg" && state.type === "secondary")
          ? "h-[36px]"
          : (state.content === "leading-icon" &&
              state.size === "xs" &&
              state.state === "loading" &&
              state.type === "danger") ||
            (state.content === "leading-icon" &&
              state.size === "xs" &&
              state.state === "loading" &&
              state.type === "primary") ||
            (state.content === "leading-icon" &&
              state.size === "xs" &&
              state.state === "loading" &&
              state.type === "tertiary") ||
            (state.content === "leading-icon" && state.size === "xs" && state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "xs" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "xs" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "xs" &&
              state.state === "disabled" &&
              state.type === "secondary") ||
            (state.content === "text-only" &&
              state.size === "xs" &&
              state.state === "hover" &&
              state.type === "secondary") ||
            (state.content === "text-only" && state.size === "xs" && state.state === "loading") ||
            (state.content === "trailing-icon" &&
              state.size === "xs" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "trailing-icon" &&
              state.size === "xs" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "trailing-icon" &&
              state.size === "xs" &&
              state.state === "hover" &&
              state.type === "secondary") ||
            (state.content === "trailing-icon" && state.size === "xs" && state.state === "loading")
          ? "h-[24px]"
          : ""
      } ${
        (state.content === "leading-icon" && state.state === "loading") ||
        (state.content === "text-only" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.state === "active" && state.type === "primary") ||
        (state.content === "trailing-icon" && state.state === "loading")
          ? "overflow-hidden"
          : ""
      } ${
        (state.content === "icon-only" && state.state === "active" && state.type === "primary") ||
        (state.content === "leading-icon" && state.state === "loading") ||
        (state.content === "text-only" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.state === "loading")
          ? "justify-center"
          : ""
      } ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {((state.content === "leading-icon" && state.size === "base" && state.state === "loading") ||
        (state.content === "leading-icon" && state.size === "lg" && state.state === "loading") ||
        (state.content === "leading-icon" && state.size === "sm" && state.state === "loading") ||
        (state.content === "leading-icon" && state.size === "xl" && state.state === "loading") ||
        (state.content === "text-only" && state.size === "base" && state.state === "loading") ||
        (state.content === "text-only" && state.size === "lg" && state.state === "loading") ||
        (state.content === "text-only" && state.size === "sm" && state.state === "loading") ||
        (state.content === "text-only" && state.size === "xl" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.size === "base" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.size === "lg" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.size === "sm" && state.state === "loading") ||
        (state.content === "trailing-icon" && state.size === "xl" && state.state === "loading")) && (
        <LoadingSpinner31
          className={
            state.size === "lg" && ["danger", "primary", "secondary"].includes(state.type)
              ? "!relative !w-[20px] !h-[20px] !mt-[-2.00px] !mb-[-2.00px]"
              : "!relative !w-[20px] !h-[20px]"
          }
          color={state.type === "primary" ? "#2DD4BF" : state.type === "danger" ? "#F87171" : "#E5E7EB"}
          fill={
            state.type === "primary"
              ? "#CCFBF1"
              : state.type === "tertiary"
              ? "#16A34A"
              : state.type === "danger"
              ? "#FEE2E2"
              : "#374151"
          }
        />
      )}

      {((state.content === "leading-icon" &&
        state.size === "xs" &&
        state.state === "loading" &&
        state.type === "secondary") ||
        (state.content === "trailing-icon" &&
          state.size === "xs" &&
          state.state === "loading" &&
          state.type === "secondary")) && <LoadingSpinner12 className="!relative !w-[16px] !h-[16px]" />}

      {state.size === "xs" &&
        state.state === "loading" &&
        state.type === "secondary" &&
        state.content === "text-only" && <LoadingSpinner14 className="!relative !w-[16px] !h-[16px]" />}

      {(state.state === "active" ||
        state.state === "default" ||
        state.state === "disabled" ||
        state.state === "hover" ||
        (state.content === "icon-only" && state.state === "loading")) && (
        <ButtonBase
          className={buttonBaseTypeDefaultSizeXsClassName}
          divClassName={buttonBaseDivClassName}
          icon={buttonBaseIcon}
          sixteenCircle58Color={
            (state.content === "leading-icon" &&
              state.size === "base" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "base" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "base" &&
              state.state === "hover" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "sm" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "sm" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "sm" &&
              state.state === "hover" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "xs" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "xs" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "xs" &&
              state.state === "hover" &&
              state.type === "secondary")
              ? "#374151"
              : (state.content === "leading-icon" && state.size === "base" && state.state === "disabled") ||
                (state.content === "leading-icon" && state.size === "sm" && state.state === "disabled") ||
                (state.content === "leading-icon" && state.size === "xs" && state.state === "disabled")
              ? "#D1D5DB"
              : (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "active" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "default" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "hover" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "active" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "default" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "hover" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "active" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "default" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "hover" &&
                  state.type === "primary")
              ? "white"
              : (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "active" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "default" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "base" &&
                  state.state === "hover" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "active" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "default" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "sm" &&
                  state.state === "hover" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "active" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "default" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "xs" &&
                  state.state === "hover" &&
                  state.type === "tertiary")
              ? "#16A34A"
              : undefined
          }
          sixteenCircle58Stroke={
            (state.content === "trailing-icon" &&
              state.size === "base" &&
              state.state === "active" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "base" &&
              state.state === "default" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "base" &&
              state.state === "hover" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "sm" &&
              state.state === "active" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "sm" &&
              state.state === "default" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "sm" &&
              state.state === "hover" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "xs" &&
              state.state === "active" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "xs" &&
              state.state === "default" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "xs" &&
              state.state === "hover" &&
              state.type === "tertiary")
              ? "#16A34A"
              : (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "active" &&
                  state.type === "primary") ||
                (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "default" &&
                  state.type === "primary") ||
                (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "hover" &&
                  state.type === "primary") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "active" &&
                  state.type === "primary") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "default" &&
                  state.type === "primary") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "hover" &&
                  state.type === "primary") ||
                (state.content === "trailing-icon" &&
                  state.size === "xs" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "xs" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "xs" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "xs" &&
                  state.state === "hover" &&
                  state.type === "primary")
              ? "white"
              : (state.content === "trailing-icon" && state.size === "base" && state.state === "disabled") ||
                (state.content === "trailing-icon" && state.size === "sm" && state.state === "disabled") ||
                (state.content === "trailing-icon" && state.size === "xs" && state.state === "disabled")
              ? "#D1D5DB"
              : (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "active" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "default" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "base" &&
                  state.state === "hover" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "active" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "default" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "sm" &&
                  state.state === "hover" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "xs" &&
                  state.state === "active" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "xs" &&
                  state.state === "default" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "xs" &&
                  state.state === "hover" &&
                  state.type === "secondary")
              ? "#374151"
              : undefined
          }
          size={
            state.size === "sm"
              ? "sm"
              : state.size === "base"
              ? "base"
              : state.size === "lg"
              ? "lg"
              : state.size === "xl"
              ? "xl"
              : "xs"
          }
          text={buttonBaseText}
          twentyCircle65Color={
            (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "lg" &&
              state.state === "hover" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "active" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "default" &&
              state.type === "secondary") ||
            (state.content === "leading-icon" &&
              state.size === "xl" &&
              state.state === "hover" &&
              state.type === "secondary")
              ? "#374151"
              : state.content === "leading-icon" && state.state === "disabled" && ["lg", "xl"].includes(state.size)
              ? "#D1D5DB"
              : (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "active" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "default" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "hover" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "active" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "default" &&
                  state.type === "primary") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "hover" &&
                  state.type === "primary")
              ? "white"
              : (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "active" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "default" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "lg" &&
                  state.state === "hover" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "active" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "default" &&
                  state.type === "tertiary") ||
                (state.content === "leading-icon" &&
                  state.size === "xl" &&
                  state.state === "hover" &&
                  state.type === "tertiary")
              ? "#16A34A"
              : undefined
          }
          twentyCircle65Stroke={
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "active" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "lg" &&
              state.state === "hover" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "active" &&
              state.type === "tertiary") ||
            (state.content === "trailing-icon" &&
              state.size === "xl" &&
              state.state === "hover" &&
              state.type === "tertiary")
              ? "#16A34A"
              : (state.content === "trailing-icon" &&
                  state.size === "lg" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "lg" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "lg" &&
                  state.state === "default" &&
                  state.type === "tertiary") ||
                (state.content === "trailing-icon" &&
                  state.size === "lg" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "lg" &&
                  state.state === "hover" &&
                  state.type === "primary") ||
                (state.content === "trailing-icon" &&
                  state.size === "xl" &&
                  state.state === "active" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "xl" &&
                  state.state === "default" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "xl" &&
                  state.state === "hover" &&
                  state.type === "danger") ||
                (state.content === "trailing-icon" &&
                  state.size === "xl" &&
                  state.state === "hover" &&
                  state.type === "primary")
              ? "white"
              : state.content === "trailing-icon" && state.state === "disabled" && ["lg", "xl"].includes(state.size)
              ? "#D1D5DB"
              : (state.content === "trailing-icon" &&
                  state.size === "lg" &&
                  state.state === "active" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "lg" &&
                  state.state === "default" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "lg" &&
                  state.state === "hover" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "xl" &&
                  state.state === "active" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "xl" &&
                  state.state === "default" &&
                  state.type === "secondary") ||
                (state.content === "trailing-icon" &&
                  state.size === "xl" &&
                  state.state === "hover" &&
                  state.type === "secondary")
              ? "#374151"
              : undefined
          }
          type={state.content === "icon-only" ? "icon-only" : "default"}
          visible={["text-only", "trailing-icon"].includes(state.content) ? false : undefined}
          visible1={buttonBaseVisible}
        />
      )}

      {((state.content === "leading-icon" &&
        state.size === "xs" &&
        state.state === "loading" &&
        state.type === "danger") ||
        (state.content === "leading-icon" &&
          state.size === "xs" &&
          state.state === "loading" &&
          state.type === "primary") ||
        (state.content === "text-only" &&
          state.size === "xs" &&
          state.state === "loading" &&
          state.type === "danger") ||
        (state.content === "text-only" &&
          state.size === "xs" &&
          state.state === "loading" &&
          state.type === "primary") ||
        (state.content === "trailing-icon" &&
          state.size === "xs" &&
          state.state === "loading" &&
          state.type === "danger") ||
        (state.content === "trailing-icon" &&
          state.size === "xs" &&
          state.state === "loading" &&
          state.type === "primary")) && (
        <LoadingSpinner48
          className="!relative !w-[16px] !h-[16px]"
          color={state.type === "danger" ? "#F87171" : "#2DD4BF"}
          fill={state.type === "danger" ? "#FEE2E2" : "#CCFBF1"}
        />
      )}

      {((state.content === "leading-icon" &&
        state.size === "xs" &&
        state.state === "loading" &&
        state.type === "tertiary") ||
        (state.content === "text-only" &&
          state.size === "xs" &&
          state.state === "loading" &&
          state.type === "tertiary") ||
        (state.content === "trailing-icon" &&
          state.size === "xs" &&
          state.state === "loading" &&
          state.type === "tertiary")) && <LoadingSpinner64 className="!relative !w-[16px] !h-[16px]" />}
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "default",
      };
  }

  return state;
}
