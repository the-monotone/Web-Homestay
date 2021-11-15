import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SelectButton } from "../components/forms/SelectButton";
import { TextField } from "../components/forms/TextField";
import { MultiSelect } from "../components/forms/MultiSelect";
import { NumField } from "../components/forms/NumField";
import { RoomContext } from "../context/roomContext";
import { ManagerRoomContext } from "../context/managerRoomContext";
import { useLocation } from 'react-router-dom'
import { UPDATE_ROOM } from "../reducer/type";

export const RoomEdit = () => {
  const { roomType, roomFacility } = useContext(RoomContext);
  const { dispatch } = useContext(ManagerRoomContext);

  const location = useLocation();
  const {room} = location.state;
  console.log(room);


  const validate = Yup.object({
    name: Yup.string().required("Bắt buộc"),
    room_type: Yup.number().min(1, "Bạn chưa chọn loại phòng"),
    num_guest: Yup.number()
      .typeError("Bắt buộc phải là số") 
      .positive("Số khách phải lớn hơn 0")
      .integer("Số khách chỉ bao gồm các chữ số")
      .required("Bắt buộc"),
    num_bed: Yup.number()
      .typeError("Bắt buộc phải là số")
      .positive("Số phòng ngủ phải lớn hơn 0")
      .integer("Số phòng ngủ chỉ bao gồm các chữ số")
      .required("Bắt buộc"),
    num_bedroom: Yup.number()
      .typeError("Bắt buộc phải là số")
      .positive("Số phòng tắm phải lớn hơn 0")
      .integer("Số phòng tắm chỉ bao gồm các chữ số")
      .required("Bắt buộc"),
    price: Yup.number()
      .typeError("Chưa đúng định dạng (VD: 20.03)")
      .positive("Giá phòng phải lớn hơn 0")
      .required("Bắt buộc")
      .test("is-decimal", "Chưa đúng định dạng (VD: 20.03)", (value) => {
        return (
          (value + "").match(/^\d*\.{1}\d*$/) || (value + "").match(/^\d*$/)
        );
      }),
  });

  const onSubmit = (_room) => {
    dispatch({
      type: UPDATE_ROOM,
      payload: _room
    })
  };

  const initialValue = room;

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validate}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="row g-3">
          <h2 className="my-4 font-weight-bold-display-4">
            Chỉnh sửa thông tin phòng
          </h2>
          <Form>
            <TextField label="Tên phòng" name="name" type="text" pos="col-12" />
            <SelectButton
              label="Loại phòng"
              name="room_type"
              options={roomType}
              pos="col-12"
            />
            <div className="field-inline-2">
              <NumField
                label="Số khách"
                name="num_guest"
                type="number"
                pos="col-md-6"
              />
              <NumField
                label="Số phòng ngủ"
                name="num_bed"
                type="number"
                pos="col-md-6"
              />
            </div>
            <div className="field-inline-2">
              <NumField
                label="Số phòng tắm"
                name="num_bedroom"
                type="number"
                pos="col-md-6"
              />
            </div>
            <MultiSelect
              label="Tiện nghi"
              name="room_facility"
              options={roomFacility}
              setValue={formik.setFieldValue}
            />
            <NumField
              label="Giá phòng"
              name="price"
              type="number"
              pos="col-md-6"
            />

            <button className="btn btn-dark mt-3" type="update">
              Sửa
            </button>
            <button className="btn btn-dark mt-3 ms-3" type="delete">
              Xoá
            </button>
            <button className="btn btn-danger mt-3 ms-3" type="reset">
              Huỷ
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
