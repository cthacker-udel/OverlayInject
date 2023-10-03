### [React-Bootstrap](https://react-bootstrap.netlify.app/) [OverlayTrigger](https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger) Wrapper.

#### Benefits:

- Less boilerplate code
- More customization options
  - Display while hovering over tooltip customization
  - Override props without providing boilerplate function
- Compatible with NextJS 13+

#### Specifications

- Language
  - Typescript
- Framework
  - React >18+

##### Props Descriptions

- **`delay`** _OverlayDelay: `{ hide: number, show: number }`_
  - The applied `react-bootstrap` property for the OverlayTrigger component
    - `{{ hide: <ms>, show: <ms> }}`
- **`displayWhileHover`** _boolean_
  - Custom prop, allows for the tooltip to stay visible while the user is hovering over it, and then disappears when the tooltip loses focus.
- **`onToggle`** _`(_nextShow: boolean) => void`_ _inherited from react-bootstrap's OverlayTrigger onToggle callback [specification](https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger-1)_
  - `_nextShow`: The next boolean value that will be applied to the state of the component `_nextShow = true -->` the component is "showing"
- **`placement`** _Placement: AutoPlacement | BasePlacement | VariantPlacement_ _inherited from react-bootstrap's OverlayTrigger Placement type [specification](https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger-1), basically an string enum_
  - Controls the placement of the tooltip relative to it's wrapped children
- **`show`** _boolean_
  - The most important value, controls whether the Tooltip is shown or not on the screen, or inserted into the DOM.
    - show = true --> tooltip is showing
    - show = false --> tooltip is not showing
- **`title`** _string | ReactNode_
  - The contents of the tooltip, fully customizable, can either be a raw string, or a complex ReactNode component
- **`trigger`** _OverlayTriggerType | OverlayTriggerType[]_ _inherited from react-bootstrap's OverlayTrigger [specifications](https://react-bootstrap.netlify.app/docs/components/overlays/#overlaytrigger-1)_
