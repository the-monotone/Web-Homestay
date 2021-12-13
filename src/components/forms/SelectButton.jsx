import React from "react";
import { ErrorMessage, useField } from "formik";

export const SelectButton = ({label, ...props}) => {
    const [field] = useField(props);


    return(
        <div className={props.pos + ' mb-2'}>
            <label htmlFor={field.name}>{label}</label>
            <div>
                <select id={field.name} name = {field.name} value={field.value} className="form-select" {...field}>
                    {props.options.map(option => {
                            return(
                                <option key={option.key} value={option.key}>{option.value}</option>
                            )
                        })}
                    
                </select>
            <ErrorMessage name = {field.name} component='div' style={{color:'red'}}/>
            </div>    
        </div>
    )

}