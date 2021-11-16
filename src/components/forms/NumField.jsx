import React, { useState } from "react";
import {ErrorMessage, useField } from "formik";

export const NumField = ({label, ...props}) => {

    const [field, meta, helper] = useField(props);

    var [count, setCount] = useState(field.value);

    const increase = e => {
        e.preventDefault();
        count = field.value;
        count++;
        helper.setValue(count);
        setCount(count);
    }

    const descrease = e => {
        e.preventDefault();
        count = field.value;
        count--;
        helper.setValue(count);
        setCount(count);
    }


    return(
        <div className={"mb-2 me-2 " + props.pos}>
            <label htmlFor={field.name}>{label}</label>
            <div className="dis-flex number-input">
                <i className="bi bi-plus-circle-fill" onClick={increase}></i>
                <input 
                className={`form-control shadow-none ${meta.touched && meta.error&& 'is-invalid'}`}
                {...field}
                {...props}
                autoComplete="off"
                />
                <i className="bi bi-dash-circle-fill" onClick={descrease}></i>
            </div>
            <ErrorMessage name={field.name} />
        </div>
    )
}