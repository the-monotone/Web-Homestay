import React from 'react';
import './myButton.css'
export const MyButton = ({children, ...props}) => 
{
    const {classNam} = props;

    return (
        <div className={"myButton " + classNam}>
            {children}
        </div>
    )
}