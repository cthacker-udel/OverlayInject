"use client";
import React, { type PropsWithChildren, type ReactNode } from "react";
import { OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import type {
  OverlayDelay,
  OverlayTriggerType,
} from "react-bootstrap/esm/OverlayTrigger";
import type { Placement } from "react-bootstrap/esm/types";

import { renderTooltip } from "./renderTooltip";

/**
 * The properties of the OverlayInject component
 */
type OverlayInjectProperties = {
  /**
   * The delay of the tooltip displaying/hiding, specified in React-Bootstrap's documentation of the `OverlayTrigger` component
   * @see https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger-1
   */
  readonly delay?: OverlayDelay;

  /**
   * Custom prop. Controls whether the tooltip displays while the user is hovering over it, and then disappears when the user's mouse loses focus
   */
  readonly displayWhileHover?: boolean;

  /**
   * Fires when the tooltip toggles on/off
   *
   * @see https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger-1
   *
   * @param _nextShow - The next boolean value propagating to the state
   * @returns Nothing, mutates the component state directly
   */
  readonly onToggle?: (_nextShow: boolean) => void;

  /**
   * The placement of the tooltip, can be left/right/bottom/top
   *
   * @see https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger-1
   */
  readonly placement?: Placement;

  /**
   * Controls whether the tooltip displays to the user, or renders in the DOM
   *
   * @see https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger-1
   */
  readonly show?: boolean;

  /**
   * The content of the tooltip, can either be a string or a ReactNode, for more potential customization
   */
  readonly title: string | ReactNode;

  /**
   * The custom class name that is supplied to the title content when calling the `renderTooltip` method
   */
  readonly titleClassName?: string;

  /**
   * The type of trigger that causes the tooltip to display
   *
   * @see https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger-1
   */
  readonly trigger?: OverlayTriggerType | OverlayTriggerType[];
};

/**
 * DRY practice, allowing for components to be wrapped in this component and customize the overlay to their specifications,
 * without having to implement the boilerplate
 *
 * @param props.children - The component being "wrapped" by the OverlayInject
 * @param props.titleClassName - The class name of the title, if supplied, overrides the title class name
 * @param props.delay - The delay to apply to the overlay
 * @param props.displayWhileHover - Controls whether the tooltip stays displayed while the user is hovering over the tooltip
 * @param props.onToggle - Fires when the visibility of the tooltip is changing (when the tooltip is toggled)
 * @param props.placement - (defaults to bottom) The placement of the Overlay
 * @param props.show - (defaults to undefined) Whether to show the overlay or not
 * @param props.title - The title of the overlay, aka the content
 * @param props.trigger - How the tooltip is triggered, such as mouse hover, etc.
 */
export const OverlayInject = ({
  children,
  delay,
  displayWhileHover = false,
  onToggle,
  placement = "bottom",
  show,
  title,
  titleClassName,
  trigger,
}: PropsWithChildren<OverlayInjectProperties>): JSX.Element => {
  /**
   * Used if the `displayWhileHover` prop is supplied to the component, allows
   * for the tooltip to stay shown when the user hovers over it
   */
  const [hoverShow, setHoverShow] = React.useState<boolean | undefined>(
    undefined
  );

  /**
   * Fires when the user's mouse enters the tooltip, setting the show state to true
   */
  const onMouseEnter = React.useCallback(() => {
    setHoverShow(true);
  }, []);

  /**
   * Fires when the user's mouse leaves the tooltip, setting the show state to false
   */
  const onMouseLeave = React.useCallback(() => {
    setHoverShow(undefined);
  }, []);

  // Returns the OverlayTrigger wrapper component
  return (
    <OverlayTrigger
      delay={delay}
      onToggle={onToggle}
      overlay={(properties: OverlayInjectedProps): JSX.Element =>
        displayWhileHover
          ? React.cloneElement(
              renderTooltip({
                classNameOverride: titleClassName,
                content: title,
                props: properties,
              }),
              { onMouseEnter, onMouseLeave }
            )
          : renderTooltip({
              classNameOverride: titleClassName,
              content: title,
              props: properties,
            })
      }
      placement={placement}
      show={displayWhileHover ? hoverShow : show}
      trigger={trigger}
    >
      {children as JSX.Element}
    </OverlayTrigger>
  );
};
