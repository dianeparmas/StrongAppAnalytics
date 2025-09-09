import { useRef, useState } from "react";

import { ActionStatus, ButtonProps } from "../../types/Button.types";

import { ACTION_STATUS } from "../../constants/actions";

import Icon from "../Icon/Icon";

import "./Button.css";

const Button = ({
  onClickFunction,
  label,
  idleIcon = "placeholder",
}: ButtonProps) => {
  const [status, setStatus] = useState<ActionStatus>(ACTION_STATUS.IDLE);
  const timeoutRef = useRef<number | null>(null);

  const handleClick = async () => {
    setStatus(ACTION_STATUS.LOADING);
    try {
      onClickFunction();
      setStatus(ACTION_STATUS.SUCCESS);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(
        () => setStatus(ACTION_STATUS.IDLE),
        1500,
      );
    } catch (e) {
      setStatus(ACTION_STATUS.IDLE);
    }
  };

  return (
    <>
      <button onClick={handleClick}>
        <span className="hide-mobile">{label}</span>
        {status === ACTION_STATUS.IDLE && (
          <Icon icon={idleIcon} width={16} height={16} />
        )}
        {status === ACTION_STATUS.LOADING && <div className="loader" />}
        {status === ACTION_STATUS.SUCCESS && (
          <Icon icon="success" width={16} height={16} />
        )}
      </button>
    </>
  );
};

export default Button;
