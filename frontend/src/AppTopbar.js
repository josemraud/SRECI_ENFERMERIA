import React from 'react';
import { InputText } from 'primereact/inputtext';

export const AppTopbar = (props) => {
    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </button>
        </div>
    );
}
