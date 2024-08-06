"use client";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ClipboardButton({value}: { value: string }) {
  const onClick = () => {
    navigator.clipboard.writeText(value);
  }
  return (<OverlayTrigger placement="top" overlay={(<Tooltip id="tooltip">Copy to clipboard</Tooltip>)}>
    <button className="border-0 bg-transparent" onClick={onClick}>
      <i className="bi bi-clipboard"></i></button>
  </OverlayTrigger>)
}
