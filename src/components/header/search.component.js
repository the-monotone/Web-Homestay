import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { Form, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { useNavigate, createSearchParams } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";
import {
  useSpring,
  animated,
} from 'react-spring'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const options = {
  componentRestrictions: { country: "vn" },
}

const SearchModal = ({ show, onHide }) => {
  const [isSearchPlace, setSearchPlace] = useState(false);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guest, setGuest] = useState(0);
  const [isChoosingPlace, setChoosingPlace] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const navigate = useNavigate();
  const handleChange = (input) => {
    let search = JSON.parse(localStorage.getItem("search"));
    let newSearch = {
      ...search,
      description: null,
      latitude: null,
      longitude: null
    }
    localStorage.setItem("search", JSON.stringify(newSearch));
    setInputValue(input);
  };

  const setSelectedPlace = (address) => {
    console.log(address);
    setSearchPlace(false);
    setChoosingPlace(false);
    setInputValue(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng)
        let search = JSON.parse(localStorage.getItem("search"));
        let newSearch = {
          ...search,
          description: address,
          latitude: latLng.lat,
          longitude: latLng.lng
        }
        localStorage.setItem("search", JSON.stringify(newSearch));
      })
      .catch(err => console.error(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (beginDate) beginDate.setHours(beginDate.getHours() + 8);
    if (endDate) endDate.setHours(endDate.getHours() + 8);
    let search = JSON.parse(localStorage.getItem("search"));
    if (search.description === null) {
      geocodeByAddress(inputValue)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        let body = {
          description: inputValue,
          latitude: latLng.lat,
          longitude: latLng.lng,
          begin_date: beginDate !== null? new Date(beginDate).toISOString().split("T")[0] : null,
          end_date: endDate !== null? new Date(endDate).toISOString().split("T")[0] : null,
          num_guest: guest,
          radius: 10,
        }
        localStorage.setItem("search", JSON.stringify(body));
        onHide();
        navigate({
          pathname: "/search",
          search: `?${createSearchParams({ ...body})}`,
        });
      })
      .catch(err => console.error(err));
    } else {
      const body = {
        description: inputValue,
        latitude: search.latitude,
        longitude: search.longitude,
        begin_date: beginDate !== null? new Date(beginDate).toISOString().split("T")[0] : null,
        end_date: endDate !== null? new Date(endDate).toISOString().split("T")[0] : null,
        num_guest: guest,
        radius: 10,
      };
      onHide();
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
              <PlacesAutocomplete 
                value={inputValue} 
                onChange={handleChange} 
                onSelect={setSelectedPlace}
                searchOptions={options}
                required>
                {({getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input 
                      {...getInputProps({
                        type: "text", 
                        placeholder: "Bạn muốn đi đâu?", 
                        className: "w-100 search-input",
                        onFocus: () => {setSearchPlace(true)},
                        onBlur: handleBlurInput,
                        required: true
                      })} />
                    {
                      isSearchPlace &&
                      <div className="search-place round-radius shadow mt-3"
                        onMouseEnter={() => {setChoosingPlace(true)}}
                        onMouseLeave={() => {setChoosingPlace(false)}}>
                        <div className="ms-1 d-flex align-items-center fw-bold">
                          Địa điểm tìm kiếm
                        </div>
                        <ListGroup>
                          {suggestions.map((item) => {
                            return (
                              <ListGroupItem key={item.placeId} {...getSuggestionItemProps(item)}>
                                {item.description}
                              </ListGroupItem>
                            )
                          })}
                        </ListGroup>
                      </div>
                    }
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            <div
              className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3 gray-border-right"
            >
              <strong>Nhận phòng</strong>
              <DatePicker
                selected={beginDate}
                placeholderText="dd/MM/yyyy"
                onChange={setBeginDate}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                maxDate={endDate}
                monthsShown={2}
                customInput={<input />}
                isClearable
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
                onChange={setEndDate}
                dateFormat="dd/MM/yyyy"
                minDate={beginDate}
                monthsShown={2}
                customInput={<input />}
                isClearable
                className="input-w100 search-input"
              />
            </div>
            <div
              className="fixed-height d-flex flex-column justify-content-center col-12 col-md-2 btn-guest"
            >
              <strong>Khách</strong>
              <GuestPicker guest={guest} changeGuest={setGuest} />
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
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guest, setGuest] = useState(0);
  const [isChoosingPlace, setChoosingPlace] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const navigate = useNavigate();
  
  const handleChange = (input) => {
    let search = JSON.parse(localStorage.getItem("search"));
    let newSearch = {
      ...search,
      description: null,
      latitude: null,
      longitude: null
    }
    localStorage.setItem("search", JSON.stringify(newSearch));
    setInputValue(input);
  };

  const setSelectedPlace = (address) => {
    console.log(address);
    setSearchPlace(false);
    setChoosingPlace(false);
    setInputValue(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng)
        let search = JSON.parse(localStorage.getItem("search"));
        let newSearch = {
          ...search,
          description: address,
          latitude: latLng.lat,
          longitude: latLng.lng
        }
        localStorage.setItem("search", JSON.stringify(newSearch));
      })
      .catch(err => console.error(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (beginDate) beginDate.setHours(beginDate.getHours() + 8);
    if (endDate) endDate.setHours(endDate.getHours() + 8);
    let search = JSON.parse(localStorage.getItem("search"));
    if (search.description === null) {
      geocodeByAddress(inputValue)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        let body = {
          description: inputValue,
          latitude: latLng.lat,
          longitude: latLng.lng,
          begin_date: beginDate !== null? new Date(beginDate).toISOString().split("T")[0] : null,
          end_date: endDate !== null? new Date(endDate).toISOString().split("T")[0] : null,
          num_guest: guest,
          radius: 10,
        }
        localStorage.setItem("search", JSON.stringify(body));
        navigate({
          pathname: "/search",
          search: `?${createSearchParams({ ...body})}`,
        });
      })
      .catch(err => console.error(err));
    } else {
      const body = {
        description: inputValue,
        latitude: search.latitude,
        longitude: search.longitude,
        begin_date: beginDate !== null? new Date(beginDate).toISOString().split("T")[0] : null,
        end_date: endDate !== null? new Date(endDate).toISOString().split("T")[0] : null,
        num_guest: guest,
        radius: 10,
      };
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
              <PlacesAutocomplete 
                value={inputValue} 
                onChange={handleChange} 
                onSelect={setSelectedPlace}
                searchOptions={options}
                required>
                {({getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                  return (
                    <div>
                      <input 
                        {...getInputProps({
                          type: "text", 
                          placeholder: "Bạn muốn đi đâu?", 
                          className: "w-100 search-input",
                          onFocus: () => {setSearchPlace(true)},
                          onBlur: handleBlurInput,
                          required: true
                        })} />
                      {
                        isSearchPlace &&
                        <div className="search-place round-radius shadow mt-3"
                          onMouseEnter={() => {setChoosingPlace(true)}}
                          onMouseLeave={() => {setChoosingPlace(false)}}>
                          <div className="ms-1 d-flex align-items-center fw-bold">
                            Địa điểm tìm kiếm
                          </div>
                          <ListGroup>
                            {suggestions.map((item) => {
                              return (
                                <ListGroupItem key={item.placeId} {...getSuggestionItemProps(item)}>
                                  {item.description}
                                </ListGroupItem>
                              )
                            })}
                          </ListGroup>
                        </div>
                      }
                    </div>
                )}}
              </PlacesAutocomplete>
            </div>
            
          </div>
          <div
            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3"
          >
            <div className="w-100 gray-border-right">
              <strong className="ms-1 search-form-label">Nhận phòng</strong>
              <DatePicker
                selected={beginDate}
                placeholderText="dd/MM/yyyy"
                onChange={setBeginDate}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                maxDate={endDate}
                monthsShown={2}
                customInput={<input />}
                isClearable
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
                onChange={setEndDate}
                dateFormat="dd/MM/yyyy"
                minDate={beginDate}
                monthsShown={2}
                customInput={<input />}
                isClearable
                className="input-w100 search-input"
              />
            </div>
          </div>
          <div
            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-2 btn-guest"
          >
            <strong className="ms-1 search-form-label">Khách</strong>
            <GuestPicker guest={guest} changeGuest={setGuest} />
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
