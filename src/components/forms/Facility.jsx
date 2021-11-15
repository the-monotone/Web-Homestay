import React from "react";

export function Facility(props) {
    const {option, facility, setFacility, setValue} = props;

    const clickHandle = (id) => {
        let promise = new Promise(
            function (resolve) {
                resolve();
            }
        );

        promise
            .then(() => {
                let temp = [...facility];
                setFacility(prev => {
                    let isChecked = prev.includes(id);
                    if (isChecked) {
                        temp = prev.filter(item => item !== id);
                        return temp;
                    } 
                    temp = [...prev, id];
                    return temp;
                })
                return temp;
            })
            .then(temp => {
                setValue(temp);
            })
    }



    return(
        <div>
            <div 
                className={facility.includes(option.id) ? "myCard text-center border-success mb-3 checked" : "myCard text-center border-primary mb-3"} 
                value={option.id}  
                onClick={() => clickHandle(option.id)}
            >
                <div className={facility.includes(option.id) ? "card-body" : "card-body"}>
                    <h6 className="card-title">{option.facility}</h6>
                    <p className="card-text">{option.description}</p>
                </div>
            </div>
        </div>
    )
}