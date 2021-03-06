import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SelectButton } from "../components/forms/SelectButton";
import { TextField } from "../components/forms/TextField";
import { MultiSelect } from "../components/forms/MultiSelect";
import { NumField } from "../components/forms/NumField";
import { RoomContext } from "../context/roomContext";
import { useNavigate, useLocation } from "react-router";
import { Button, Row, ProgressBar, Col } from "react-bootstrap";
import './roomSignup.page.css';
import { useSpring, animated } from 'react-spring'
import { ImageForm } from "../components/forms/ImageForm";
import MapField from "../components/forms/MapField";
import HostLayout from "../components/hostlayout.component";
export const RoomSignUp = () => {
  const { roomType, roomFacility, createRoom, updateRoom } = useContext(RoomContext);

  const [isGetting, setGetting] = useState(false);

  const userState = JSON.parse(localStorage.getItem('user-state'));


  const navigate = useNavigate();

  const location = useLocation();
  var stateRoom;

  if (location.state) {
    stateRoom = location.state.stateRoom;
  }




  const onSubmit = async (room) => {
    let {image_upload, location, ...tempRoom} = room;
    let cloneRoom = {
      ...tempRoom,
      room_type_id: parseInt(tempRoom.room_type_id),
      latitude: location.latitude,
      longitude: location.longitude
    }
    const requestCreateRoom = async () => {
      if (!stateRoom) {
        await createRoom(userState.token, cloneRoom)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      } else {
        await updateRoom(userState.token, cloneRoom)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
    }
    
    requestCreateRoom();
    navigate("/host/roommanager");
  };


  const initialValue = stateRoom ? stateRoom : {
    room_name: "",
    room_type_id: 1,
    facilities: [],
    images: [],
    rule: '',
    num_guest: 1,
    num_bed: 1,
    num_bedroom: 1,
    num_bathroom: 1,
    price: 23012.13,
    location: null
  };

  return (
    <HostLayout>
      <FormikStepper initialValues={initialValue} onSubmit={onSubmit} isGetting={isGetting}>
        <Form>
          <FormikStep
            validationSchema={Yup.object({
              room_name: Yup.string().required("B???t bu???c"),
            })}
            className="room-name-field"
          >
            <TextField label = "T??n ph??ng" name="room_name" type="text" pos="col-8" />
          </FormikStep>
          <FormikStep
            validationSchema={Yup.object({
              room_type_id: Yup.number().min(1, "B???n ch??a ch???n lo???i ph??ng"),
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
                .typeError("B???t bu???c ph???i l?? s???")
                .positive("S??? kh??ch ph???i l???n h??n 0")
                .integer("S??? kh??ch ch??? bao g???m c??c ch??? s???")
                .required("B???t bu???c"),
              num_bed: Yup.number()
                .typeError("B???t bu???c ph???i l?? s???")
                .positive("S??? gi?????ng ph???i l???n h??n 0")
                .integer("S??? gi?????ng ch??? bao g???m c??c ch??? s???")
                .required("B???t bu???c"),
              num_bedroom: Yup.number()
                .typeError("B???t bu???c ph???i l?? s???")
                .positive("S??? ph??ng ng??? ph???i l???n h??n 0")
                .integer("S??? ph??ng ng??? ch??? bao g???m c??c ch??? s???")
                .required("B???t bu???c"),
              num_bathroom: Yup.number()
                .typeError("B???t bu???c ph???i l?? s???")
                .positive("S??? ph??ng t???m ph???i l???n h??n 0")
                .integer("S??? ph??ng t???m ch??? bao g???m c??c ch??? s???")
                .required("B???t bu???c"),
            })}
            className="number-contain-field"
          >
            <NumField
              label="S??? kh??ch"
              name="num_guest"
              type="number"
              pos="col-md-6 num-field"
            />
            <NumField
              label="S??? gi?????ng"
              name="num_bed"
              type="number"
              pos="col-md-6 num-field"
            />
            <NumField
              label="S??? ph??ng ng???"
              name="num_bedroom"
              type="number"
              pos="col-md-6 num-field"
            />
            <NumField
              label="S??? ph??ng t???m"
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
            <TextField label = "Quy t???c" name="rule" type="textarea" pos="col-8" style={{ height: '100px' }}/>
          </FormikStep>
          <FormikStep
            className="room-images"
          >
            <ImageForm 
              label="???nh"
              name="images"
              type="file"
              pos="col-md-12 image-field"
              setGetting={setGetting}
              isGetting={isGetting}
            />
          </FormikStep>
          
          <FormikStep
            validationSchema={Yup.object({
              price: Yup.number()
                .typeError("Ch??a ????ng ?????nh d???ng (VD: 20.03)")
                .positive("Gi?? ph??ng ph???i l???n h??n 0")
                .required("B???t bu???c")
                .test(
                  "is-decimal",
                  "Ch??a ????ng ?????nh d???ng (VD: 20.03)",
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
            <div className="price-description"><span>??</span> m???i ????m</div>
            </div>
          </FormikStep>
        </Form>
      </FormikStepper>
    </HostLayout>
  );
};

export const FormikStep = ({ children }) => {
  const styleAnimate = useSpring({
    from: {opacity: 0, y: 100},
    to: {opacity: 1, y: 0}
  })
  return <animated.div style={styleAnimate} className="input-wrap">{children}</animated.div>;
};

export const FormikStepper = ({ children, isGetting,...props }) => {
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
        return "?????u ti??n, h??y ?????t t??n cho ch??? ??? c???a b???n"
      case 'room-type-field':
        return 'Kh??ch s??? ???????c s??? d???ng lo???i ch??? ??? n??o?'
      case 'number-contain-field':
        return 'B???n mu???n ????n bao nhi??u kh??ch?'
      case 'room-facility-field':
        return 'Cho kh??ch bi???t ch??? ??? c???a b???n c?? nh???ng g??'
      case 'room-price-field':
        return 'B??y gi??? ?????n ph???n th?? v??? r???i - ?????t gi?? cho thu??'
      case 'room-images':
        return 'H??y ????ng m???t s??? ???nh ????? kh??ch tham quan c?? th??? tham kh???o n??o'
      case 'room-rule-field':
        return 'Nh???ng ??i???u b???n mu???n kh??ch h??ng c???a m??nh tu??n th??? l?? g???'
      case 'room-location':
        return "Th??m v??? tr?? b???ng c??ch t??m ki???m th??nh ph??? v?? ??i???u ch???nh Marker"
      default:
        return "????ng k?? ph??ng";
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
          <Row className="input-step w-100 mt-2">
            <Col md='6' sm='0' className="label-field">
              <animated.div style={styleAnimate}><div className="title ps-4">{getTitle(currentChild.props.className)}</div></animated.div>
            </Col>
            <Col md='6' sm='12' className="input-field">
              <div className = "input-row">{currentChild}</div>
              <ProgressBar animated now={Math.floor((step+1) /(childrenArray.length) * 100)} variant="dark"/>
              <div md="12" className="button-row">
                {step > 0 ? (
                  <Button
                    onClick={() => setStep((s) => s - 1)}
                    variant="outline-secondary "
                    className="pre"
                    disabled={isGetting}
                  >
                    Quay l???i
                  </Button>
                ) : null}
                <Button type="submit" variant="outline-success" className="next" disabled={isGetting}>
                  {!isLastStep() ? "Ti???p theo" : "Ho??n t???t"}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Formik>
  );
};
