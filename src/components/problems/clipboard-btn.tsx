"use client";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";

export default function ClipboardButton({value}: { value: string }) {
  const initTooltip = "Copy to clipboard";
  const initIcon = "bi bi-clipboard";
  const [tooltip, setTooltip] = useState(initTooltip);
  const [icon, setIcon] = useState(initIcon)

  const reset = () => {
    setTooltip(initTooltip);
    setIcon(initIcon);
  }

  const onClick = async () => {
    await navigator.clipboard.writeText(value);
    setTooltip("Copied!");
    setIcon("bi bi-clipboard-check");
    setTimeout(reset, 3000);
  }
  return (<OverlayTrigger
    placement="left"
    overlay={(<Tooltip>{tooltip}</Tooltip>)}
  >
    <button className="border-0 bg-transparent" onClick={onClick}>
      <i className={icon}></i></button>
  </OverlayTrigger>)
}
