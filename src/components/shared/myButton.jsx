import React from 'react';
import './myButton.css'
export const MyButton = (props) => 
{
    const {text, classNam} = props;

    return (
        <div className={"myButton " + classNam}>
            <span>
                {text}
            </span>
        </div>
    )
}