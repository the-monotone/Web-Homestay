import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SelectButton } from "../components/forms/SelectButton";
import { TextField } from "../components/forms/TextField";
import { MultiSelect } from "../components/forms/MultiSelect";
import { NumField } from "../components/forms/NumField";
import { RoomContext } from "../context/roomContext";
import { useNavigate, useLocation } from "react-router";
import { Button, Row, ProgressBar } from "react-bootstrap";
import './roomSignup.page.css';
import { useSpring, animated } from 'react-spring'
import { ImageForm } from "../components/forms/ImageForm";
import MapField from "../components/forms/MapField";

export const RoomSignUp = () => {
  const { roomType, roomFacility, createRoom, updateRoom } = useContext(RoomContext);

  console.log(roomType);
  console.log(roomFacility);


  const navigate = useNavigate();

  const location = useLocation();
  var stateRoom;

  if (location.state) {
    stateRoom = location.state.stateRoom;
  }

  console.log(stateRoom);


  const onSubmit = async (room) => {
    let {image_upload, location, ...tempRoom} = room;
    let cloneRoom = {
      ...tempRoom,
      room_type_id: parseInt(tempRoom.room_type_id),
      confirmed: 1,
      latitude: location.latitude,
      longitude: location.longitude
    }
    console.log(cloneRoom);
    const requestCreateRoom = async () => {
      if (!stateRoom) {
        await createRoom(cloneRoom)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      } else {
        await updateRoom(cloneRoom)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
    }
    
    requestCreateRoom();
    navigate("/roommanager");
  };


  const initialValue = stateRoom ? stateRoom : {
    room_name: "",
    room_type_id: 1,
    facilities: [],
    images: [],
    rule: '',
    num_guest: 0,
    num_bed: 0,
    num_bedroom: 0,
    num_bathroom: 0,
    price: 23012.13,
    location: null
  };

  return (
    <FormikStepper initialValues={initialValue} onSubmit={onSubmit}>
      <Form>
        <FormikStep
          validationSchema={Yup.object({
            room_name: Yup.string().required("Bắt buộc"),
          })}
          className="room-name-field"
        >
          <TextField label = "Tên phòng" name="room_name" type="text" pos="col-8" />
        </FormikStep>
        <FormikStep
          validationSchema={Yup.object({
            room_type_id: Yup.number().min(1, "Bạn chưa chọn loại phòng"),
          })}
          className = "room-type-field"
        >
          <SelectButton
            name="room_type_id"
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
            name="facilities"
            options={roomFacility}
          />
        </FormikStep>
        <FormikStep className="room-location">
          <MapField name="location" />
        </FormikStep>
        <FormikStep
          className="room-rule-field"
        >
          <TextField label = "Quy tắc" name="rule" type="textarea" pos="col-8" style={{ height: '100px' }}/>
        </FormikStep>
        <FormikStep
          className="room-images"
        >
          <ImageForm 
            label="Ảnh"
            name="images"
            type="file"
            pos="col-md-12 image-field"
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
          <div className = "price-group">
          <NumField
            name="price"
            type="number"
            pos="col-md-12 price-input"
          />
          <div className="price-description"><span>đ</span> mỗi đêm</div>
          </div>
        </FormikStep>
      </Form>
    </FormikStepper>
  );
};

export const FormikStep = ({ children }) => {
  const styleAnimate = useSpring({
    from: {opacity: 0, y: 100},
    to: {opacity: 1, y: 0}
  })
  return <animated.div style={styleAnimate} className="input-wrap">{children}</animated.div>;
};

export const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children.props.children);

  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }
  
  const styleAnimate = useSpring({
    from: {opacity: 0, y: 100},
    to: {opacity: 1, y: 0}
  })

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
        return 'Bây giờ đến phần thú vị rồi - đặt giá cho thuê'
      case 'room-images':
        return 'Hãy đăng một số ảnh để khách tham quan có thể tham khảo nào'
      case 'room-rule-field':
        return 'Những điều bạn muốn khách hàng của mình tuân thủ là gì?'
      case 'room-location':
        return "Thêm vị trí bằng cách tìm kiếm thành phố và điều chỉnh Marker"
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
              <animated.div style={styleAnimate}><div className="title">{getTitle(currentChild.props.className)}</div></animated.div>
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
