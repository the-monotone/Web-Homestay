import React from "react";
import {ErrorMessage, useField } from "formik";
import {Form} from "react-bootstrap";

export const TextField = ({label, errStyle , ...props}) => {

    const [field, meta] = useField(props);

    return(
        <Form.Group className={props.pos ?  props.pos : "mb-3"}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control 
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field}
                {...props}
                as={(props.type === "textarea") ? "textarea" : "input"}
                autoComplete="off"
            />
            <ErrorMessage name={field.name} component='div' style={!errStyle ? {color:'red'} : errStyle}/>
        </Form.Group>
    )
}