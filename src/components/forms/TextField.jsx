import React from "react";
import {ErrorMessage, useField } from "formik";
import {Form, FloatingLabel } from "react-bootstrap";

export const TextField = ({label, ...props}) => {

    const [field, meta] = useField(props);
    console.log(field,props);

    return(
        <div className={props.pos ?  props.pos : "" + " mb-3"}>
            <FloatingLabel controlId="floatingInput" label = {label}>
                <Form.Control 
                    className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                    {...field}
                    {...props}
                    as={(props.type == "textarea") ? "textarea" : "input"}
                    autoComplete="off"
                />
            </FloatingLabel>
            <ErrorMessage name={field.name}/>
        </div>
    )
}