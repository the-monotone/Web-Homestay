import React from "react";
import {ErrorMessage, FastField, useField } from "formik";

export const RadioButton = ({label, ...props}) => {
    const [field] = useField(props);
    return (
        <div>
            <label >{label}</label>
            <div>
                <FastField  name={field.name}>
                    {
                        ({field}) => {
                            return props.options.map(option => {
                                return (
                                    <React.Fragment key = {option.key}>
                                        <input 
                                            className={`form-check-input`} 
                                            type="radio" name="inlineRadioOptions" 
                                            id={option.value} 
                                            {...field}
                                            value ={option.value}
                                            checked = {field.value === option.value}
                                        />
                                        <label className="form-check-label me-5 ms-1" htmlFor={option.value}>
                                            {option.value}
                                        </label>
                                    </React.Fragment>
                                )
                            })
                        }
                    }
                </FastField>
                <ErrorMessage name = {field.name}/>
            </div>
        </div>
    );
}