import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";
import { Facility } from "./Facility";

export const MultiSelect = ({label, ...props}) => {
    const [field, ,helper] = useField(props);
        
    const [facility, setFacility] = useState(field.value);
    return (
        <div className="mb-3 form">
            <label htmlFor={field.name}>{label}</label>
            <div name = {field.name} {...field} className="container facility-container mt-3">
                    {props.options.map(option => {
                            return(
                                <div className="row col-md-4" key = {option.id}>
                                    <Facility 
                                        option={option} 
                                        facility={facility} 
                                        setFacility={setFacility}
                                        setValue ={helper.setValue}
                                    />
                                </div>
                            )
                        })} 
            </div>
            <ErrorMessage name = {field.name}/>
        </div>
    )

    
}