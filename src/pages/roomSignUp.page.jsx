import React, { useContext, useState } from "react";
import { Formik, Form, FormikConfig, FormikValues } from "formik";
import * as Yup from "yup";
import { SelectButton } from "../components/forms/SelectButton";
import { TextField } from "../components/forms/TextField";
import { MultiSelect } from "../components/forms/MultiSelect";
import { NumField } from "../components/forms/NumField";
import { RoomContext } from "../context/roomContext";
import { ManagerRoomContext } from "../context/managerRoomContext";
import { ADD_ROOM } from "../reducer/actionTypes";
import { useNavigate } from "react-router";
import { Button, Row, ProgressBar } from "react-bootstrap";
import './roomSignup.page.css'

export const RoomSignUp = () => {
  const { roomType, roomFacility } = useContext(RoomContext);
  const { dispatch } = useContext(ManagerRoomContext);

  const navigate = useNavigate();

  const onSubmit = async (room) => {
    await dispatch({
      type: ADD_ROOM,
      payload: room,
    });
    navigate("/roommanager");
  };

  const initialValue = {
    id: -1,
    name: "",
    room_type: 0,
    room_facility: [],
    image: [],
    address: "",
    num_guest: 0,
    num_bed: 0,
    num_bedroom: 0,
    num_bathroom: 0,
    price: 0.0,
  };

  return (
    <FormikStepper initialValues={initialValue} onSubmit={onSubmit}>
      <Form>
        <FormikStep
          validationSchema={Yup.object({
            name: Yup.string().required("Bắt buộc"),
          })}
          className="room-name-field"
        >
          <TextField label="Tên phòng" name="name" type="text" pos="col-8" />
        </FormikStep>
        <FormikStep
          validationSchema={Yup.object({
            room_type: Yup.number().min(1, "Bạn chưa chọn loại phòng"),
          })}
          className = "room-type-field"
        >
          <SelectButton
            label="Phòng của bạn thuộc loại phòng nào?"
            name="room_type"
            options={roomType}
            pos="col-8"
          />
        </FormikStep>
        <FormikStep
          validationSchema={Yup.object({
            num_guest: Yup.number()
              .typeError("Bắt buộc phải là số")
              .positive("Số khách phải lớn hơn 0")
              .integer("Số khách chỉ bao gồm các chữ số")
              .required("Bắt buộc"),
            num_bed: Yup.number()
              .typeError("Bắt buộc phải là số")
              .positive("Số giường phải lớn hơn 0")
              .integer("Số giường chỉ bao gồm các chữ số")
              .required("Bắt buộc"),
            num_bedroom: Yup.number()
              .typeError("Bắt buộc phải là số")
              .positive("Số phòng ngủ phải lớn hơn 0")
              .integer("Số phòng ngủ chỉ bao gồm các chữ số")
              .required("Bắt buộc"),
            num_bathroom: Yup.number()
              .typeError("Bắt buộc phải là số")
              .positive("Số phòng tắm phải lớn hơn 0")
              .integer("Số phòng tắm chỉ bao gồm các chữ số")
              .required("Bắt buộc"),
          })}
          className="number-contain-field"
        >
          <NumField
            label="Số khách"
            name="num_guest"
            type="number"
            pos="col-md-6 num-field"
          />
          <NumField
            label="Số giường"
            name="num_bed"
            type="number"
            pos="col-md-6 num-field"
          />
          <NumField
            label="Số phòng ngủ"
            name="num_bedroom"
            type="number"
            pos="col-md-6 num-field"
          />
          <NumField
            label="Số phòng tắm"
            name="num_bathroom"
            type="number"
            pos="col-md-6 num-field"
          />
        </FormikStep>
        <FormikStep className="room-facility-field">
          <MultiSelect
            name="room_facility"
            options={roomFacility}
          />
        </FormikStep>
        <FormikStep
          validationSchema={Yup.object({
            price: Yup.number()
              .typeError("Chưa đúng định dạng (VD: 20.03)")
              .positive("Giá phòng phải lớn hơn 0")
              .required("Bắt buộc")
              .test(
                "is-decimal",
                "Chưa đúng định dạng (VD: 20.03)",
                (value) => {
                  return (
                    (value + "").match(/^\d*\.{1}\d*$/) ||
                    (value + "").match(/^\d*$/)
                  );
                }
              ),
          })}
          className = "room-price-field"
        >
          <NumField
            label="Giá phòng"
            name="price"
            type="number"
            pos="col-md-8"
          />
        </FormikStep>
      </Form>
    </FormikStepper>
  );
};

export const FormikStep = ({ children }) => {
  return <>{children}</>;
};

export const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children.props.children);

  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  function getTitle(classNam) {
    switch(classNam) {
      case 'room-name-field':
        return "Đầu tiên, hãy đặt tên cho chỗ ở của bạn"
      case 'room-type-field':
        return 'Khách sẽ được sử dụng loại chỗ ở nào?'
      case 'number-contain-field':
        return 'Bạn muốn đón bao nhiêu khách?'
      case 'room-facility-field':
        return 'Cho khách biết chỗ ở của bạn có những gì'
      case 'room-price-field':
        return 'Bây giờ đến phần thú vị rồi – đặt giá cho thuê'
      default:
        return "Đăng ký phòng";
    }
  }

  return (
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helper) => {
          if (isLastStep()) {
            await props.onSubmit(values, helper);
          } else {
            setStep((s) => s + 1);
          }
        }}
      >
        <Form>
          <Row className="input-step">
            <div className="label-field">
              <div className="title">{getTitle(currentChild.props.className)}</div>
            </div>
            <div className="input-field">
              <div className = "input-row">{currentChild}</div>
              <ProgressBar animated now={Math.floor((step+1) /(childrenArray.length) * 100)} variant="dark"/>
              <div md="12" className="button-row">
                {step > 0 ? (
                  <Button
                    onClick={() => setStep((s) => s - 1)}
                    variant="outline-secondary "
                    className="pre"
                  >
                    Quay lại
                  </Button>
                ) : null}
                <Button type="submit" variant="outline-success" className="next">
                  {!isLastStep() ? "Tiếp theo" : "Hoàn tất"}
                </Button>
              </div>
            </div>
          </Row>
        </Form>
      </Formik>
  );
};
