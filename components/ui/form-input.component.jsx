import React from "react";

import classes from "./form-input.module.scss";

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className={classes.group}>
        <input className={classes.form_input} onChange={handleChange} {...otherProps} />
        {
            label ?
            (<label className={`${otherProps.value.length ? 'shrink' : ''} ${classes.form_input_label}`} htmlFor={`${otherProps.name}`}>
                {label}
            </label>)
            : null
        }
    </div>
)

export default FormInput;