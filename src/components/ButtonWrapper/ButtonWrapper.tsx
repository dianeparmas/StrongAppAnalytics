import { useEffect, useRef, useState } from "react";

import {
  ActionStatus,
  ButtonWrapperProps,
} from "../../types/ButtonWrapper.types";

import { ACTION_STATUS } from "../../constants/actions";

import Button from "../Button/Button";
import Icon from "../Icon/Icon";

import "./ButtonWrapper.css";

const ButtonWrapper = ({
  defaultLabel,
  onAction,
  isUploadBtn,
  parsedCsv,
  fileLastModifiedDate,
  setFileLastModifiedDate,
  setIsCurrentDataSaved,
  setLastSaved,
  setParsedCsv,
}: ButtonWrapperProps) => {
  const [status, setStatus] = useState<ActionStatus>(ACTION_STATUS.IDLE);
  const timeoutRef = useRef<number | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(ACTION_STATUS.LOADING);
    try {
      await onAction(e);
      setStatus(ACTION_STATUS.SUCCESS);
      setIsCurrentDataSaved(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(
        () => setStatus(ACTION_STATUS.IDLE),
        1500,
      );
    } catch (e) {
      setStatus(ACTION_STATUS.IDLE);
    }
  };

  const handleSave = async () => {
    try {
      localStorage.setItem(
        "StrongAppCSV",
        JSON.stringify({
          data: JSON.stringify(parsedCsv),
          storedAt: new Date().toISOString(),
          fileSaved: fileLastModifiedDate?.toISOString(),
        }),
      );
      setLastSaved(new Date());
      setFileLastModifiedDate(fileLastModifiedDate);
      setIsCurrentDataSaved(true);
      return Promise.resolve();
    } catch (err) {
      setStatus(ACTION_STATUS.IDLE);
      return Promise.reject(err);
    }
  };

  const handleDelete = async () => {
    try {
      localStorage.removeItem("StrongAppCSV");
      setParsedCsv([]);
      return Promise.resolve();
    } catch (err) {
      setStatus(ACTION_STATUS.IDLE);
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    isUploadBtn && (
      <>
        <label className={"input-hidden-label input-new"}>
          <span className="hide-mobile">{defaultLabel}</span>
          <input
            type="file"
            id="csvFile"
            className="input-hidden"
            onChange={(e) => handleUpload(e)}
            accept=".csv"
          />
          {status === ACTION_STATUS.IDLE && (
            <Icon icon="upload" width={16} height={16} />
          )}
          {status === ACTION_STATUS.LOADING && <div className="loader" />}
          {status === ACTION_STATUS.SUCCESS && (
            <Icon icon="success" width={16} height={16} />
          )}
        </label>
        <Button onClickFunction={handleSave} label="Save" idleIcon="save" />
        <Button
          onClickFunction={handleDelete}
          label="Delete"
          idleIcon="delete"
        />
      </>
    )
  );
};

export default ButtonWrapper;
