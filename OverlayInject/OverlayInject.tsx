/* eslint-disable no-confusing-arrow -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import React, { type PropsWithChildren, type ReactNode } from "react";
import { OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import type {
  OverlayDelay,
  OverlayTriggerType,
} from "react-bootstrap/esm/OverlayTrigger";
import type { Placement } from "react-bootstrap/esm/types";

import { renderTooltip } from "./renderTooltip";

type OverlayInjectProperties = {
  readonly delay?: OverlayDelay;
  readonly displayWhileHover?: boolean;
  readonly onToggle?: (_nextShow: boolean) => void;
  readonly placement?: Placement;
  readonly show?: boolean;
  readonly title: string | ReactNode;
  readonly trigger?: OverlayTriggerType | OverlayTriggerType[];
};

/**
 * DRY practice, allowing for components to be wrapped in this component and customize the overlay to their specifications,
 * without having to implement the boilerplate
 *
 * @param props.children - The component being "wrapped" by the OverlayInject
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

  return (
    <OverlayTrigger
      delay={delay}
      onToggle={onToggle}
      overlay={(properties: OverlayInjectedProps): JSX.Element =>
        displayWhileHover
          ? React.cloneElement(
              renderTooltip({ content: title, props: properties }),
              { onMouseEnter, onMouseLeave }
            )
          : renderTooltip({ content: title, props: properties })
      }
      placement={placement}
      show={displayWhileHover ? hoverShow : show}
      trigger={trigger}
    >
      {children as JSX.Element}
    </OverlayTrigger>
  );
};
