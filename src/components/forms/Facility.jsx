import React from "react";
import './facility.css'

export function Facility(props) {
  const { option, facilities, setFacilities, setValue } = props;


  const clickHandle = (id) => {
    let promise = new Promise(function (resolve) {
      resolve();
    });

    //Update những tiện ích được chọn
    promise
      .then(() => {
        let temp = [...facilities];
        setFacilities((prev) => {
          let isChecked = prev.includes(id);
          if (isChecked) {
            temp = prev.filter((item) => item !== id);
            return temp;
          }
          temp = [...prev, id];
          return temp;
        });
        return temp;
      })
      .then((temp) => {
        setValue(temp);
      });
  };

  return (
    <div>
      <div
        className={
          facilities.includes(option.id)
            ? "myFacility text-center border-success mb-3 checked"
            : "myFacility text-center border-primary mb-3"
        }
        value={option.id}
        onClick={() => clickHandle(option.id)}
      >
        <div
          className="card-body"
        >
          <h6 className="card-title">{option.facility}</h6>
          <p className="card-text">{option.description}</p>
        </div>
      </div>
    </div>
  );
}
