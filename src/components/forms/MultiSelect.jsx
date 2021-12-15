import React, { useEffect, useState } from "react";
import { ErrorMessage, useField } from "formik";
import { Facility } from "./Facility";
import './facility.css'

export const MultiSelect = ({label, ...props}) => {
    const [field, ,helper] = useField(props);   
    const [facilities, setFacilities] = useState(field.value);

    
    useEffect(() => {
        setFacilities([...field.value]);
    },[field.value])

    return (
        <div className="mb-3 form">
            <label htmlFor={field.name}>{label}</label>
            <div name = {field.name} {...field} className="container facility-container mt-3 facility-list">
                {props.options.map(option => {
                        return(
                            <div className="row col-md-6" key = {option.id}>
                                <Facility 
                                    option={option} 
                                    facilities={facilities} 
                                    setFacilities={setFacilities}
                                    setValue ={helper.setValue}
                                />
                            </div>
                        )
                    })} 
            </div>
            <ErrorMessage name = {field.name} component='div' style={{color:'red'}}/>
        </div>
    )

    
}