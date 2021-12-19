import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { Form, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { autocompleteApi, placeDetailApi } from "../../api/goong.api";
import { useNavigate, createSearchParams } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";
import {
  useSpring,
  animated,
} from 'react-spring'

const SearchModal = ({ show, onHide }) => {
  const [isSearchPlace, setSearchPlace] = useState(false);
  const [isChoosingPlace, setChoosingPlace] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  const navigate = useNavigate();
  const {
    changePlace,
    changeStartDate,
    changeEndDate,
    changeGuest,
    place,
    startDate,
    endDate,
    guest,
  } = useContext(SearchContext);

  const searchPlace = (input) => {
    setInputValue(input);
    autocompleteApi(
      input,
      (result) => {
        setPredictions(result.data.predictions);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const setSelectedPlace = (place_item) => {
    setSearchPlace(false);
    setChoosingPlace(false);
    setInputValue(place_item.description);
    placeDetailApi(
      place_item.place_id,
      (result) => {
        const location = result.data.results[0].geometry.location;
        changePlace({
          description: place_item.description,
          lat: location.lat,
          lng: location.lng,
        });
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (place.lat === null) {
      autocompleteApi(
        inputValue,
        (result) => {
          placeDetailApi(
            result.data.predictions[0].place_id,
            (detailResult) => {
              const location = detailResult.data.results[0].geometry.location;
              changePlace({
                description: inputValue,
                lat: location.lat,
                lng: location.lng,
              });
              onHide();
              const body = {
                description: inputValue,
                latitude: location.lat,
                longitude: location.lng,
                begin_date: startDate !== null? new Date(startDate).toISOString().split("T")[0] : null,
                end_date: endDate !== null? new Date(endDate).toISOString().split("T")[0] : null,
                num_guest: guest,
                radius: 10,
              };
              console.log(body);
              localStorage.setItem("search", JSON.stringify(body));
              navigate({
                pathname: "/search",
                search: `?${createSearchParams({
                  ...body,
                })}`,
              });
            },
            (err) => {
              console.error(err);
            }
          );
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      onHide();
      const body = {
        description: inputValue,
        latitude: place.lat,
        longitude: place.lng,
        begin_date: startDate !== null? new Date(startDate).toISOString().split("T")[0] : null,
        end_date: endDate !== null? new Date(endDate).toISOString().split("T")[0] : null,
        num_guest: guest,
        radius: 10,
      };
      console.log(body);
      localStorage.setItem("search", JSON.stringify(body));
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({
          ...body,
        })}`,
      });
    }
  };

  const handleBlurInput = () => {
    if (isChoosingPlace) return;
    setSearchPlace(false);
  }

  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-search">
      <Form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="m-1 round-radius p-1 rounded-pill pe-1 ps-1"
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-12 col-md-3 gray-border-right position-relative"
            >
              <strong className="ms-1">Địa điểm</strong>
              <input
                type="text"
                value={inputValue}
                placeholder="Bạn muốn đi đâu?"
                onChange={(e) => searchPlace(e.target.value)}
                className="input-w100 search-input"
                onFocus={() => {setSearchPlace(true)}}
                onBlur={handleBlurInput}
                required
              />
              {
                isSearchPlace && 
                <div onMouseEnter={() => {setChoosingPlace(true)}}
                  onMouseLeave={() => {setChoosingPlace(false)}}>
                  <PlacePicker
                    predictions={predictions}
                    setSelectedPlace={setSelectedPlace}
                  />
                </div>
              }
            </div>
            <div
              className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3 gray-border-right"
            >
              <strong>Nhận phòng</strong>
              <DatePicker
                selected={startDate}
                placeholderText="dd/MM/yyyy"
                onChange={(date) => {
                  changeStartDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                maxDate={endDate}
                monthsShown={2}
                customInput={<input />}
                className="input-w100 search-input"
              />
            </div>
            <div
              className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3 gray-border-right"
            >
              <strong>Trả phòng</strong>
              <DatePicker
                selected={endDate}
                placeholderText="dd/MM/yyyy"
                onChange={(date) => {
                  changeEndDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                minDate={startDate == null ? new Date() : startDate}
                monthsShown={2}
                customInput={<input />}
                className="input-w100 search-input"
              />
            </div>
            <div
              className="fixed-height d-flex flex-column justify-content-center col-12 col-md-2 btn-guest"
            >
              <strong>Khách</strong>
              <GuestPicker guest={guest} changeGuest={changeGuest} />
            </div>
            <div className="fixed-height d-flex flex-column justify-content-center col-md-1">
              <label
                htmlFor="submit-button-search-modal"
                className="btn btn-danger rounded-pill text-white text-center d-flex align-items-center justify-content-center pe-2 ps-2"
              >
                <i className="bi bi-search home-search-bar-icon"></i>
              </label>
            </div>
          </div>
        </div>
        <input type="submit" id="submit-button-search-modal" hidden />
      </Form>
    </Modal>
  );
};

const PlacePicker = (props) => {
  return (
    <div className="search-place round-radius shadow mt-3">
      <div className="ms-1 d-flex align-items-center fw-bold">
        Địa điểm tìm kiếm
      </div>
      <ListGroup>
        {props.predictions.map((item) => (
          <ListGroupItem
            key={item.place_id}
            onClick={() => {
              props.setSelectedPlace(item);
            }}
          >
            {item.description}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

const GuestPicker = ({ guest, changeGuest }) => {
  const increase = () => {
    changeGuest(guest + 1);
  };
  const decrease = () => {
    if (guest > 0) changeGuest(guest - 1);
  };
  return (
    <div className="d-flex align-items-center">
      <span
        className="bi bi-dash-circle-fill small-icon me-1"
        onClick={decrease}
      ></span>
      <input
        type="number"
        disabled
        autoComplete="off"
        placeholder="Thêm khách"
        value={guest}
        min="0"
        className="text-center input-w100 input-h0 search-input"
      />
      <span
        className="bi bi-plus-circle-fill small-icon ms-1"
        onClick={increase}
      ></span>
    </div>
  );
};

export const OnlySearchBar = () => {
  const [isSearchPlace, setSearchPlace] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isChoosingPlace, setChoosingPlace] = useState(false);
  const navigate = useNavigate();
  const {
    changePlace,
    changeStartDate,
    changeEndDate,
    changeGuest,
    place,
    startDate,
    endDate,
    guest,
  } = useContext(SearchContext);

  const { searchBarOnViewport} = useContext(SearchContext);

  const styles = useSpring({
    config: { duration: 80 },
    from: {
      scale: searchBarOnViewport ? '60%' : '100%',
      opacity: searchBarOnViewport ? 0 : 1,
      translateY: 0
    },
    to: {
      scale: searchBarOnViewport ? '100%' : '60%',
      opacity: searchBarOnViewport ? 1 : 0,
      translateY: searchBarOnViewport ? 0 : -50
    }
  });



  const searchPlace = (input) => {
    setInputValue(input);
    autocompleteApi(
      input,
      (result) => {
        setPredictions(result.data.predictions);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const setSelectedPlace = (place_item) => {
    setSearchPlace(false);
    setChoosingPlace(false);
    setInputValue(place_item.description);
    placeDetailApi(
      place_item.place_id,
      (result) => {
        const location = result.data.results[0].geometry.location;
        changePlace({
          description: place_item.description,
          lat: location.lat,
          lng: location.lng,
        });
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (place.lat === null) {
      autocompleteApi(
        inputValue,
        (result) => {
          placeDetailApi(
            result.data.predictions[0].place_id,
            (detailResult) => {
              const location = detailResult.data.results[0].geometry.location;
              changePlace({
                description: inputValue,
                lat: location.lat,
                lng: location.lng,
              });
              const body = {
                description: inputValue,
                latitude: location.lat,
                longitude: location.lng,
                begin_date: startDate !== null? new Date(startDate).toISOString().split("T")[0] : null,
                end_date: endDate !== null? new Date(endDate).toISOString().split("T")[0] : null,
                num_guest: guest,
                radius: 10,
              };
              console.log(body);
              localStorage.setItem("search", JSON.stringify(body));
              navigate({
                pathname: "/search",
                search: `?${createSearchParams({
                  ...body,
                })}`,
              });
            },
            (err) => {
              console.error(err);
            }
          );
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      const body = {
        description: inputValue,
        latitude: place.lat,
        longitude: place.lng,
        begin_date: startDate !== null? new Date(startDate).toISOString().split("T")[0] : null,
        end_date: endDate !== null? new Date(endDate).toISOString().split("T")[0] : null,
        num_guest: guest,
        radius: 10,
      };
      console.log(body);
      localStorage.setItem("search", JSON.stringify(body));
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ ...body })}`,
      });
    }
  };

  const handleBlurInput = () => {
    if (isChoosingPlace) return;
    setSearchPlace(false);
  }

  return (
    <animated.div
      style={{ ...styles }}
      className='home-search-bar-container'
    >
    <Form
      id="search-form"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
      className="position-relative rounded-pill-responsive pe-2 ps-4 bg-light"
    >
      <div className="container">
        <div className="row align-items-center">
          <div
            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3"
          >
            <div className="w-100 gray-border-right position-relative">
              <strong className="ms-1 search-form-label">Địa điểm</strong>
              <input
                type="text"
                value={inputValue}
                placeholder="Bạn muốn đi đâu?"
                onChange={(e) => searchPlace(e.target.value)}
                className="w-100 search-input"
                onFocus={() => {setSearchPlace(true)}}
                onBlur={handleBlurInput}
                required
              />
              {
                isSearchPlace && 
                <div 
                  onMouseEnter={() => {setChoosingPlace(true)}}
                  onMouseLeave={() => {setChoosingPlace(false)}}>
                  <PlacePicker
                    predictions={predictions}
                    setSelectedPlace={setSelectedPlace}
                  />
                </div>
              }
            </div>
            
          </div>
          <div
            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3"
          >
            <div className="w-100 gray-border-right">
              <strong className="ms-1 search-form-label">Nhận phòng</strong>
              <DatePicker
                selected={startDate}
                placeholderText="dd/MM/yyyy"
                onChange={(date) => {
                  changeStartDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                maxDate={endDate}
                monthsShown={2}
                customInput={<input />}
                className="input-w100 search-input"
              />
            </div>
          </div>
          <div
            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3"
          >
            <div className="w-100 gray-border-right">
              <strong className="ms-1 search-form-label">Trả phòng</strong>
              <DatePicker
                selected={endDate}
                placeholderText="dd/MM/yyyy"
                onChange={(date) => {
                  changeEndDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                minDate={startDate == null ? new Date() : startDate}
                monthsShown={2}
                customInput={<input />}
                className="input-w100 search-input"
              />
            </div>
          </div>
          <div
            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-2 btn-guest"
          >
            <strong className="ms-1 search-form-label">Khách</strong>
            <GuestPicker guest={guest} changeGuest={changeGuest} />
          </div>
          <div className="fixed-height d-flex flex-column justify-content-center col-12 col-md-1">
            <label
              htmlFor="submit-button-search"
              className="btn btn-danger rounded-pill text-white text-center d-flex align-items-center justify-content-center pe-2 ps-2"
            >
              <i className="bi bi-search home-search-bar-icon"></i>
            </label>
          </div>
        </div>
      </div>
      <input type="submit" id="submit-button-search" hidden />
    </Form>
    </animated.div>
  );
};

export default SearchModal;
