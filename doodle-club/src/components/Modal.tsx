import { FC, useState } from "react";

export const Modal: FC<{ config: ModalConfig }> = ({ config }) => {
    const [cancelActive, setCancelActive] = useState(false);
    const [confirmActive, setConfirmActive] = useState(false);

    const modalBase = () => (
        <div className="ModalBase">
            <button id="Cancel" onClick={() => handleCancel(false)}>X</button>
            <h1>{ config.header }</h1>
            <p>{ config.message }</p>

            { config.form && config.formDefinition }

            <button id="Accept" onClick={() => handleAccept(false)}>{ config.acceptLabel }</button>
            <button id="Deny" onClick={() => handleCancel(false)}>{ config.denyLabel }</button>
        </div>
    );

    const modalConfirmCancel = () => (
            <div className="ModalCancel">

            <h1>{ config.cancelConfirmationHeader }</h1>
            <p>{ config.cancelConfirmationMessage }</p>

            <button id="CancelAccept" onClick={() => handleCancel(true)}>{ config.cancelConfirmationAcceptLabel }</button>
            <button id="CancelDeny" onClick={() => handleCancel(true)}>{ config.cancelConfirmationDenyLabel }</button>
        </div>
    );

    const modalConfirm = () => (
        <div className="ModalConfirm">

        <h1>{ config.confirmationHeader }</h1>
        <p>{ config.confirmationMessage }</p>

        <button id="ConfirmAccept" onClick={() => handleAccept(true)}>{ config.confirmationAcceptLabel }</button>
        <button id="ConfirmDeny" onClick={() => handleAccept(true)}>{ config.confirmationDenyLabel }</button>
    </div>
    );

    const handleAccept = (confirming: boolean) => {
        if(config.confirmation && !confirming)
            setConfirmActive(true);
        else
            config.confirmFunction();
    }

    const handleCancel = (canceling: boolean) => {
        if(config.cancelConfirmation && !canceling)
            setCancelActive(true);
        else
            config.cancelFunction();
    }

    return (
        <div className="Modal">
            { !cancelActive && !confirmActive && modalBase() }
            { cancelActive && modalConfirmCancel() }
            { confirmActive && modalConfirm() }
        </div>
    );
}

export interface ModalConfig {
    size?: ModalSize;

    header?: string;
    message?: string;
    acceptLabel?: string;
    denyLabel?: string;

    form?: boolean;
    formDefinition?: JSX.Element;

    confirmation?: boolean;
    confirmationHeader?: string;
    confirmationMessage?: string;
    confirmationAcceptLabel?: string;
    confirmationDenyLabel?: string;
    confirmFunction(data?: any): Result; // required; parent must handle confirm action

    cancelConfirmation?: boolean;
    cancelConfirmationHeader?: string;
    cancelConfirmationMessage?: string;
    cancelConfirmationAcceptLabel?: string;
    cancelConfirmationDenyLabel?: string;
    cancelFunction(data?: any): Result; // required; parent must handle cancel action
}

export interface  Result {
    success: boolean;
    successMessages?: string[];
    errorMessages?: string[];
    data?: any;
}

export enum ModalSize {
    SMALL,
    MEDIUM,
    LARGE
}