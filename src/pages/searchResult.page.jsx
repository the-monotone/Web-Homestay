import React from 'react';
import Map from '../components/MapComponent';
import '@goongmaps/goong-js/dist/goong-js.css';
import { RoomCard } from '../components/room/RoomCard';
import { useNavigate } from 'react-router';
import Layout from '../components/layout.component';
import useSearch from '../hook/useSearch';
const SearchResultPage = () => {
    // const {place, results} = useSearch();
    const navigate = useNavigate();
    const place = {
        description: "Hà Nội, Việt Nam",
        lat: 21.028195403,
        lng: 105.854159778
    }
    console.log(place);
    const results = [
        {
            "room_id": 427,
            "room_name": "Trải nghiệm nhà sàn độc đáo của người Tày",
            "latitude": 21.0139,
            "longitude": 105.849,
            "address_id": 22,
            "roomType": 1,
            "numGuest": 10,
            "numBed": 5,
            "numBedroom": 3,
            "numBathroom": 1,
            "rule": "Không hút thuốc;Được phép mang theo thú cưng",
            "accommodationType": "Cho phép thú cưng",
            "confirmed": true,
            "rate": null,
            "host_id": 415,
            "price": 0,
            "image": [
                {
                    "image_id": 4432,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/972bc130-ef8f-4c81-83e3-546febf62300.jpg?im_w=720"
                },
                {
                    "image_id": 4433,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/178140e7-0321-4a20-9f47-2eda62710996.jpg?im_w=720"
                },
                {
                    "image_id": 4434,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/a7b5972b-749f-4141-8076-d598b9aa680a.jpg?im_w=720"
                },
                {
                    "image_id": 4435,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/742b7a1e-5e4b-4502-89d5-2e25907a2c33.jpg?im_w=720"
                },
                {
                    "image_id": 4436,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/695e136a-8f5c-4eed-9086-72f2c87a56f8.jpg?im_w=720"
                },
                {
                    "image_id": 4437,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/117e0192-cc74-4346-842c-ce5fc6981000.jpg?im_w=720"
                },
                {
                    "image_id": 4438,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/b0d59f27-abad-4da4-a28d-974bb2df7c27.jpg?im_w=720"
                },
                {
                    "image_id": 4439,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/95c88490-17be-406f-b7bb-41d21a91efc7.jpg?im_w=720"
                },
                {
                    "image_id": 4440,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/88de7319-ab8e-4570-a1bd-6957734f89c3.jpg?im_w=720"
                },
                {
                    "image_id": 4441,
                    "room_id": 427,
                    "url": "https://a0.muscache.com/im/pictures/6dd4f961-8ee2-4d6f-8921-8f0bd6b75c3c.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 421,
            "room_name": "Bungalow with one doublebed at RockGarden",
            "latitude": 21.0052,
            "longitude": 105.835,
            "address_id": 22,
            "roomType": 3,
            "numGuest": 1,
            "numBed": 1,
            "numBedroom": 1,
            "numBathroom": 3,
            "rule": "Nhận phòng: Sau 15:00;Trả phòng: 02:00;Tự nhận phòng bằng nhân viên trực cửa;Phù hợp với em bé (dưới 2 tuổi);Không thú cưng;Cho phép hút thuốc",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": false,
            "rate": null,
            "host_id": 410,
            "price": 0,
            "image": [
                {
                    "image_id": 4365,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/1d721f4a-960c-4b35-a60c-4dba3f997d6b.jpg?im_w=720"
                },
                {
                    "image_id": 4366,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/78ab0124-bbd7-4425-95c5-6cddc948ed60.jpg?im_w=720"
                },
                {
                    "image_id": 4367,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/11c3021a-4db9-4ac6-bfde-c3bc3cbfab14.jpg?im_w=720"
                },
                {
                    "image_id": 4368,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/be4eaa89-d49f-48d7-bf91-357afafb874e.jpg?im_w=720"
                },
                {
                    "image_id": 4369,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/a6bd8226-555a-466e-91ce-819a580b816e.jpg?im_w=720"
                },
                {
                    "image_id": 4370,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/cd1675c9-e21d-4c15-beba-8196b183b8ef.jpg?im_w=720"
                },
                {
                    "image_id": 4371,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/360fb07b-a555-467e-82e9-cde2246380cc.jpg?im_w=720"
                },
                {
                    "image_id": 4372,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/a988a9da-ccf1-4dbc-8e58-6bf9bfaf97e7.jpg?im_w=720"
                },
                {
                    "image_id": 4373,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/b423ff54-6fb6-4fbf-bfed-44f720fdf398.jpg?im_w=720"
                },
                {
                    "image_id": 4374,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/0458a1d7-440a-4a09-82e6-cc2132e60825.jpg?im_w=720"
                },
                {
                    "image_id": 4375,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/9da9c599-4edf-4dd8-b51d-122e50e23702.jpg?im_w=720"
                },
                {
                    "image_id": 4376,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/e91aac0d-4811-4222-b2a5-4b4ffa02123b.jpg?im_w=720"
                },
                {
                    "image_id": 4377,
                    "room_id": 421,
                    "url": "https://a0.muscache.com/im/pictures/b77c938a-71e2-47e4-af17-f1e500b12cd3.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 428,
            "room_name": "Ha Giang Paradise Hostel & Tours",
            "latitude": 21.0277,
            "longitude": 105.887,
            "address_id": 22,
            "roomType": 1,
            "numGuest": 4,
            "numBed": 4,
            "numBedroom": 2,
            "numBathroom": 1,
            "rule": "Được phép mang theo thú cưng;Cho phép hút thuốc",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": true,
            "rate": null,
            "host_id": 416,
            "price": 0,
            "image": [
                {
                    "image_id": 4442,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-42612876/original/0093a170-8009-41fe-946d-8e5a6442259a.jpeg?im_w=720"
                },
                {
                    "image_id": 4443,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/e15fbd50-607d-4c7d-aa89-09aa8ee143b1.jpg?im_w=720"
                },
                {
                    "image_id": 4444,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/ecbc947c-bda2-49cd-a20d-bae744472e3a.jpg?im_w=720"
                },
                {
                    "image_id": 4445,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/3f78dff6-b6e5-4dcb-86f6-ef9c8fa53789.jpg?im_w=720"
                },
                {
                    "image_id": 4446,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/6076c3ff-d0ad-4d41-b2f5-493c09564509.jpg?im_w=720"
                },
                {
                    "image_id": 4447,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/33687545-fc18-4016-a359-0b6f29a6981f.jpg?im_w=720"
                },
                {
                    "image_id": 4448,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/693fec6f-5d1d-4024-a88b-1e25a40d83b6.jpg?im_w=720"
                },
                {
                    "image_id": 4449,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/595e3c43-f4de-4486-9390-c5e91686c97d.jpg?im_w=720"
                },
                {
                    "image_id": 4450,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/42b8a381-3edb-40f2-8c06-4a1b8290354a.jpg?im_w=720"
                },
                {
                    "image_id": 4451,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/46b4f338-a4ce-4fed-98f5-0ef6bb69e3e9.jpg?im_w=720"
                },
                {
                    "image_id": 4452,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/d5bb0287-838d-40fd-9aec-cf1fdbc43284.jpg?im_w=720"
                },
                {
                    "image_id": 4453,
                    "room_id": 428,
                    "url": "https://a0.muscache.com/im/pictures/e529d3b7-db0b-4796-af64-5dad3f9cf55f.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 369,
            "room_name": "CHDV ngay CV Lê Thị Riêng full nội thất",
            "latitude": 21.0474,
            "longitude": 105.827,
            "address_id": 19,
            "roomType": 1,
            "numGuest": 1,
            "numBed": 0,
            "numBedroom": 0,
            "numBathroom": 2,
            "rule": "Nhận phòng: Sau 10:00;Trả phòng: 00:00;Không hút thuốc;Không được tổ chức tiệc hoặc sự kiện",
            "accommodationType": "Wi-fi",
            "confirmed": false,
            "rate": null,
            "host_id": 366,
            "price": 0,
            "image": [
                {
                    "image_id": 3804,
                    "room_id": 369,
                    "url": "https://a0.muscache.com/im/pictures/22658c1c-2c5c-460a-bca2-57cd164e99fc.jpg?im_w=720"
                },
                {
                    "image_id": 3805,
                    "room_id": 369,
                    "url": "https://a0.muscache.com/im/pictures/999b3afa-1f92-4fdf-a507-fa2977d21cc4.jpg?im_w=720"
                },
                {
                    "image_id": 3806,
                    "room_id": 369,
                    "url": "https://a0.muscache.com/im/pictures/ffcabf53-5497-40dc-a6d3-b8f06bec1220.jpg?im_w=720"
                },
                {
                    "image_id": 3807,
                    "room_id": 369,
                    "url": "https://a0.muscache.com/im/pictures/5bf67960-bb7d-4675-b023-ea4d1f7a3e3c.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 376,
            "room_name": "Có nhiều gốc trong nhà chụp hình rất đẹp",
            "latitude": 21.0076,
            "longitude": 105.811,
            "address_id": 19,
            "roomType": 2,
            "numGuest": 8,
            "numBed": 5,
            "numBedroom": 3,
            "numBathroom": 3,
            "rule": "Nhận phòng: Linh hoạt;Trả phòng: 00:00;Không phù hợp với trẻ em và em bé;Không hút thuốc;Không thú cưng;Không được tổ chức tiệc hoặc sự kiện",
            "accommodationType": "Wi-fi",
            "confirmed": true,
            "rate": null,
            "host_id": 372,
            "price": 0,
            "image": [
                {
                    "image_id": 3890,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/f5371e02-cb33-4445-bf53-cfbf2132746d.jpg?im_w=720"
                },
                {
                    "image_id": 3891,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/7f0460c9-a225-4dc5-9853-5b87c1f28309.jpg?im_w=720"
                },
                {
                    "image_id": 3892,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/f553874b-39ad-4b89-adbd-fe7028feccd4.jpg?im_w=720"
                },
                {
                    "image_id": 3893,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/2d284d63-74ae-448f-aae7-dcbcb9244b01.jpg?im_w=720"
                },
                {
                    "image_id": 3894,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/2d46e765-31b0-4f0d-8423-fdc8e2eb573d.jpg?im_w=720"
                },
                {
                    "image_id": 3895,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/8d05e95c-7b2d-4383-adfa-5d005faebcfa.jpg?im_w=720"
                },
                {
                    "image_id": 3896,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/ba197d88-d7d3-4759-b1fb-4c5ea862fc83.jpg?im_w=720"
                },
                {
                    "image_id": 3897,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/06fc1fb2-6e58-4d69-96e0-c2e49bb2e0fe.jpg?im_w=720"
                },
                {
                    "image_id": 3898,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/8252e758-36b7-46fa-a6e9-8e3c6b976b32.jpg?im_w=720"
                },
                {
                    "image_id": 3899,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/8d353265-38ae-4dc5-922c-f03843925a9d.jpg?im_w=720"
                },
                {
                    "image_id": 3900,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/fde48396-6fb9-45e4-a8f2-ca9db61bfd32.jpg?im_w=720"
                },
                {
                    "image_id": 3901,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/b1a99daa-cab0-4ce6-b3ce-8cac2d507722.jpg?im_w=720"
                },
                {
                    "image_id": 3902,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/5b550630-c7aa-4246-8cc0-0fa79ee02768.jpg?im_w=720"
                },
                {
                    "image_id": 3903,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/1f5c6b87-9a82-4526-9252-77cd654a8dcf.jpg?im_w=720"
                },
                {
                    "image_id": 3904,
                    "room_id": 376,
                    "url": "https://a0.muscache.com/im/pictures/957c6686-38cf-478a-bb6e-1a69a07ced3a.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 420,
            "room_name": "Hmong Moonshine, Tea and Farm Tours with Locals",
            "latitude": 20.9928,
            "longitude": 105.892,
            "address_id": 22,
            "roomType": 4,
            "numGuest": 1,
            "numBed": 0,
            "numBedroom": 0,
            "numBathroom": 3,
            "rule": "Nhận phòng: Sau 14:00;Trả phòng: 12:00;Được phép mang theo thú cưng;Cho phép hút thuốc",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": true,
            "rate": null,
            "host_id": 409,
            "price": 0,
            "image": [
                {
                    "image_id": 4352,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/004e59f8-790a-4a27-bd2f-306a8e5ca1c2.jpg?im_w=720"
                },
                {
                    "image_id": 4353,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/e0f53175-0c92-47d7-b5e5-c5c099d4ef6c.jpg?im_w=720"
                },
                {
                    "image_id": 4354,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/94df6d65-36c5-4ea0-9670-974b3b127893.jpg?im_w=720"
                },
                {
                    "image_id": 4355,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/e1f00ea9-9c19-4175-b702-0b60ad97a681.jpg?im_w=720"
                },
                {
                    "image_id": 4356,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/c57cf0cb-0474-404d-b939-44f00cd44c49.jpg?im_w=720"
                },
                {
                    "image_id": 4357,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/aa4c1c68-1c27-4235-b878-be35ffec886b.jpg?im_w=720"
                },
                {
                    "image_id": 4358,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/90787f1c-90a0-4c79-a55a-c7ce616df3ba.jpg?im_w=720"
                },
                {
                    "image_id": 4359,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/52a23076-29b5-4198-9ac5-4147e99d91c7.jpg?im_w=720"
                },
                {
                    "image_id": 4360,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/a73b8139-8a39-426f-a8f2-57f1c92243a0.jpg?im_w=720"
                },
                {
                    "image_id": 4361,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/2ef7bce6-fe9d-4483-9fab-b2151433eeb4.jpg?im_w=720"
                },
                {
                    "image_id": 4362,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/c9108820-7d05-4cfe-ab96-01b5ff78c011.jpg?im_w=720"
                },
                {
                    "image_id": 4363,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/4873bc66-97c6-4ed0-bd50-3bbe84d0b9b5.jpg?im_w=720"
                },
                {
                    "image_id": 4364,
                    "room_id": 420,
                    "url": "https://a0.muscache.com/im/pictures/5d14a24a-4a88-4af1-8bda-f5d0271205db.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 425,
            "room_name": "Preciosa casa particular en la ciudad de Hà Giang",
            "latitude": 21.0835,
            "longitude": 105.832,
            "address_id": 22,
            "roomType": 1,
            "numGuest": 2,
            "numBed": 1,
            "numBedroom": 1,
            "numBathroom": 1,
            "rule": "Nhận phòng: Sau 15:00;Được phép mang theo thú cưng",
            "accommodationType": "Toàn bộ nhà",
            "confirmed": false,
            "rate": null,
            "host_id": 413,
            "price": 0,
            "image": [
                {
                    "image_id": 4414,
                    "room_id": 425,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52764738/original/00ea0911-760a-4d72-9beb-8a6903ae8341.jpeg?im_w=720"
                },
                {
                    "image_id": 4415,
                    "room_id": 425,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52764738/original/6e829bcf-03bf-4f73-b91b-f865e62af166.jpeg?im_w=720"
                },
                {
                    "image_id": 4416,
                    "room_id": 425,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52764738/original/cbbba92d-ac79-4549-9ff3-27033a5f16fa.jpeg?im_w=720"
                },
                {
                    "image_id": 4417,
                    "room_id": 425,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52764738/original/806540db-390a-4f80-bf05-42b55ca587e2.jpeg?im_w=720"
                },
                {
                    "image_id": 4418,
                    "room_id": 425,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-52764738/original/67046ee4-dba5-4d1a-9ba7-6d6fc4dd9194.jpeg?im_w=720"
                }
            ]
        },
        {
            "room_id": 419,
            "room_name": "Bungalow Paksong Farmstay - Pleiku City, Gia Lai.",
            "latitude": 20.983,
            "longitude": 105.905,
            "address_id": 21,
            "roomType": 4,
            "numGuest": 6,
            "numBed": 5,
            "numBedroom": 3,
            "numBathroom": 2,
            "rule": "Nhận phòng: 12:00 - 14:00;Được phép mang theo thú cưng;Cho phép hút thuốc",
            "accommodationType": "Toàn bộ nhà",
            "confirmed": false,
            "rate": null,
            "host_id": 408,
            "price": 0,
            "image": [
                {
                    "image_id": 4346,
                    "room_id": 419,
                    "url": "https://a0.muscache.com/im/pictures/e515289c-5a86-499f-a65d-9c89677fe833.jpg?im_w=720"
                },
                {
                    "image_id": 4347,
                    "room_id": 419,
                    "url": "https://a0.muscache.com/im/pictures/97bb1df9-7dc2-4eb0-b598-1a265415dc4a.jpg?im_w=720"
                },
                {
                    "image_id": 4348,
                    "room_id": 419,
                    "url": "https://a0.muscache.com/im/pictures/7c3a7a88-b8ce-42b6-a01c-cc1c982676f3.jpg?im_w=720"
                },
                {
                    "image_id": 4349,
                    "room_id": 419,
                    "url": "https://a0.muscache.com/im/pictures/4efb4517-73c9-4257-91b8-9f13edfa7586.jpg?im_w=720"
                },
                {
                    "image_id": 4350,
                    "room_id": 419,
                    "url": "https://a0.muscache.com/im/pictures/70645f14-42e0-4c93-9da9-3d45790fe8fc.jpg?im_w=720"
                },
                {
                    "image_id": 4351,
                    "room_id": 419,
                    "url": "https://a0.muscache.com/im/pictures/5957dae7-fb50-4799-88c3-5976675f3aea.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 368,
            "room_name": "Peace is always beautiful",
            "latitude": 21.0171,
            "longitude": 105.772,
            "address_id": 19,
            "roomType": 2,
            "numGuest": 1,
            "numBed": 1,
            "numBedroom": 1,
            "numBathroom": 3,
            "rule": "Nhận phòng: Linh hoạt;Phù hợp với em bé (dưới 2 tuổi);Không hút thuốc;Được phép mang theo thú cưng",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": false,
            "rate": null,
            "host_id": 365,
            "price": 0,
            "image": [
                {
                    "image_id": 3795,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/adc07e69-02e1-44be-879c-676333aa59fb.jpeg?im_w=720"
                },
                {
                    "image_id": 3796,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/2809a06a-8516-402b-bd9d-d4efbb63eecc.jpeg?im_w=720"
                },
                {
                    "image_id": 3797,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/c691e519-2303-40ad-866c-cf1cc27886f4.jpeg?im_w=720"
                },
                {
                    "image_id": 3798,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/a17dde78-61bb-4423-9d98-0de4c45bbfb0.jpeg?im_w=720"
                },
                {
                    "image_id": 3799,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/4c2202a8-56de-4c32-b6cf-886f549479dc.jpeg?im_w=720"
                },
                {
                    "image_id": 3800,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/29812f84-f803-4b0c-a89b-b511dfc78289.jpeg?im_w=720"
                },
                {
                    "image_id": 3801,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/264e04af-915d-4bc2-aaa6-4cb97e64dd5a.jpeg?im_w=720"
                },
                {
                    "image_id": 3802,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/55ebdfc2-ff0f-4945-b202-b0d906dd2ea8.jpeg?im_w=720"
                },
                {
                    "image_id": 3803,
                    "room_id": 368,
                    "url": "https://a0.muscache.com/im/pictures/miso/Hosting-51570514/original/c1ad00c1-324c-42fb-b12f-cdd46b0ec198.jpeg?im_w=720"
                }
            ]
        },
        {
            "room_id": 378,
            "room_name": "Phòng tiện nghi, giá rẻ, vị trí trung tâm",
            "latitude": 20.979,
            "longitude": 105.787,
            "address_id": 19,
            "roomType": 4,
            "numGuest": 7,
            "numBed": 4,
            "numBedroom": 2,
            "numBathroom": 1,
            "rule": "Nhận phòng: Sau 15:00;Không hút thuốc;Được phép mang theo thú cưng",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": false,
            "rate": null,
            "host_id": 368,
            "price": 0,
            "image": [
                {
                    "image_id": 3915,
                    "room_id": 378,
                    "url": "https://a0.muscache.com/im/pictures/160e0062-26d6-4e08-9fd5-7055957b4674.jpg?im_w=720"
                },
                {
                    "image_id": 3916,
                    "room_id": 378,
                    "url": "https://a0.muscache.com/im/pictures/6cf09823-032d-4650-8824-ed61ebb58cb9.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 426,
            "room_name": "Dong Van*Lo Lo Chai Village*Private bathroom*2 pax",
            "latitude": 20.9652,
            "longitude": 105.91,
            "address_id": 22,
            "roomType": 3,
            "numGuest": 3,
            "numBed": 1,
            "numBedroom": 1,
            "numBathroom": 1,
            "rule": "Nhận phòng: Sau 14:00;Trả phòng: 12:00;Không phù hợp với trẻ em và em bé;Không hút thuốc;Không thú cưng;Không được tổ chức tiệc hoặc sự kiện",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": true,
            "rate": null,
            "host_id": 414,
            "price": 0,
            "image": [
                {
                    "image_id": 4419,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/ccbfb955-501a-44df-a813-e59ba130f369.jpg?im_w=720"
                },
                {
                    "image_id": 4420,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/15e4433b-7825-4510-9532-fdb3a63e19a3.jpg?im_w=720"
                },
                {
                    "image_id": 4421,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/6abecbb7-87c1-47f3-b3c2-7f9d2a2fbe73.jpg?im_w=720"
                },
                {
                    "image_id": 4422,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/087fd643-b5ea-437b-9619-65d70ae598e3.jpg?im_w=720"
                },
                {
                    "image_id": 4423,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/4b75ce0d-0316-4f6d-88c4-26ff490e2360.jpg?im_w=720"
                },
                {
                    "image_id": 4424,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/ab930559-256c-486e-9f39-a093b7edf0e5.jpg?im_w=720"
                },
                {
                    "image_id": 4425,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/aa12feec-6b4e-4afc-b145-f0e0b1af2c67.jpg?im_w=720"
                },
                {
                    "image_id": 4426,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/6295e580-b5f7-4531-9056-516c098a10fb.jpg?im_w=720"
                },
                {
                    "image_id": 4427,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/616eb570-f835-4777-ba19-abef35d04731.jpg?im_w=720"
                },
                {
                    "image_id": 4428,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/900643d8-f458-41b1-bbff-4f4ca2142e6e.jpg?im_w=720"
                },
                {
                    "image_id": 4429,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/0cfdb6f6-493c-47bb-b7a3-ccb547a89c1c.jpg?im_w=720"
                },
                {
                    "image_id": 4430,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/ecdb4552-bacd-4ee9-9fc7-70040bf03a7a.jpg?im_w=720"
                },
                {
                    "image_id": 4431,
                    "room_id": 426,
                    "url": "https://a0.muscache.com/im/pictures/41674f19-d41d-447c-bd5b-b1d6d800b10e.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 430,
            "room_name": "Guest stay in pravite room can see the mountain",
            "latitude": 21.1072,
            "longitude": 105.884,
            "address_id": 22,
            "roomType": 1,
            "numGuest": 8,
            "numBed": 4,
            "numBedroom": 2,
            "numBathroom": 2,
            "rule": "Nhận phòng: 12:00 - 20:00;Trả phòng: 12:00;Được phép mang theo thú cưng;Cho phép hút thuốc",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": false,
            "rate": null,
            "host_id": 418,
            "price": 0,
            "image": [
                {
                    "image_id": 4467,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/f69a2ad5-cabc-4bb0-9219-c87f424bcf1b.jpg?im_w=720"
                },
                {
                    "image_id": 4468,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/a0757176-55c2-45c2-bdcd-2810f3bba7ed.jpg?im_w=720"
                },
                {
                    "image_id": 4469,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/b8e3a55e-9e1f-4704-a2ad-0920e115749e.jpg?im_w=720"
                },
                {
                    "image_id": 4470,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/973c0c91-9b38-47d7-b46f-7e74dea65fc7.jpg?im_w=720"
                },
                {
                    "image_id": 4471,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/d6765d38-c864-4215-89c5-a4d380a8e11e.jpg?im_w=720"
                },
                {
                    "image_id": 4472,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/63b898fb-d7c7-4b4d-8682-e92cb58a4c12.jpg?im_w=720"
                },
                {
                    "image_id": 4473,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/45f01d14-36d8-4caf-8cf7-abe489242144.jpg?im_w=720"
                },
                {
                    "image_id": 4474,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/f9434ba1-f482-43d9-97c2-bdf81051f889.jpg?im_w=720"
                },
                {
                    "image_id": 4475,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/c42a46c1-c80b-468a-9c3b-3775482a8541.jpg?im_w=720"
                },
                {
                    "image_id": 4476,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/f6f931a2-6467-473a-8af1-44acebf953f2.jpg?im_w=720"
                },
                {
                    "image_id": 4477,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/6712e48c-93af-4daf-b1c5-b761b6095189.jpg?im_w=720"
                },
                {
                    "image_id": 4478,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/d007d2b0-7eb4-45c6-9046-96b3848c35fb.jpg?im_w=720"
                },
                {
                    "image_id": 4479,
                    "room_id": 430,
                    "url": "https://a0.muscache.com/im/pictures/f77f1cbe-5de5-4017-84cb-d6f10664223f.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 418,
            "room_name": "Cozy room & Beautiful Garden - The Stay Villa",
            "latitude": 20.9601,
            "longitude": 105.8,
            "address_id": 21,
            "roomType": 4,
            "numGuest": 5,
            "numBed": 3,
            "numBedroom": 2,
            "numBathroom": 2,
            "rule": "Nhận phòng: 15:00 - 23:00;Trả phòng: 13:00;Tự nhận phòng bằng hộp khóa;Không hút thuốc;Không thú cưng;Không được tổ chức tiệc hoặc sự kiện",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": true,
            "rate": null,
            "host_id": 407,
            "price": 0,
            "image": [
                {
                    "image_id": 4339,
                    "room_id": 418,
                    "url": "https://a0.muscache.com/im/pictures/4d6a13b7-2482-4632-8131-f1372e4bb408.jpg?im_w=720"
                },
                {
                    "image_id": 4340,
                    "room_id": 418,
                    "url": "https://a0.muscache.com/im/pictures/c8f7166e-0e24-4117-9c5f-74ab363911d9.jpg?im_w=720"
                },
                {
                    "image_id": 4341,
                    "room_id": 418,
                    "url": "https://a0.muscache.com/im/pictures/793daca0-9b24-4d10-9cec-94576a60ea29.jpg?im_w=720"
                },
                {
                    "image_id": 4342,
                    "room_id": 418,
                    "url": "https://a0.muscache.com/im/pictures/46245479-e586-4bf0-bb59-b9d4616a6646.jpg?im_w=720"
                },
                {
                    "image_id": 4343,
                    "room_id": 418,
                    "url": "https://a0.muscache.com/im/pictures/dd88764f-1e8d-477b-a286-481df51406c0.jpg?im_w=720"
                },
                {
                    "image_id": 4344,
                    "room_id": 418,
                    "url": "https://a0.muscache.com/im/pictures/0bb7c8f7-a6c5-4510-a1a1-062a0b9bf610.jpg?im_w=720"
                },
                {
                    "image_id": 4345,
                    "room_id": 418,
                    "url": "https://a0.muscache.com/im/pictures/7c3857f7-0f59-44ae-84e7-59c47c428c96.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 372,
            "room_name": "Open sun-lit house in Bắc Hải, District 10",
            "latitude": 21.0276,
            "longitude": 105.763,
            "address_id": 19,
            "roomType": 1,
            "numGuest": 5,
            "numBed": 3,
            "numBedroom": 2,
            "numBathroom": 3,
            "rule": "Trả phòng: 12:00;Tự nhận phòng bằng hộp khóa;Không hút thuốc;Không được tổ chức tiệc hoặc sự kiện;Được phép mang theo thú cưng",
            "accommodationType": "Toàn bộ nhà",
            "confirmed": true,
            "rate": null,
            "host_id": 369,
            "price": 0,
            "image": [
                {
                    "image_id": 3834,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/e3c1d334-f9a2-4ebf-aabc-c1a457533e9f.jpg?im_w=720"
                },
                {
                    "image_id": 3835,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/46d8a35b-b38d-4ae7-8304-8d3d19f0691f.jpg?im_w=720"
                },
                {
                    "image_id": 3836,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/e7ddd8fd-eacd-4228-bb70-2daad7c8c736.jpg?im_w=720"
                },
                {
                    "image_id": 3837,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/5e047fc3-3740-47e6-ab0c-671f25cf88a5.jpg?im_w=720"
                },
                {
                    "image_id": 3838,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/3eeec70f-cd6c-4c60-ad77-5ba32add711b.jpg?im_w=720"
                },
                {
                    "image_id": 3839,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/df66257d-d7d6-4726-8312-0106041d190b.jpg?im_w=720"
                },
                {
                    "image_id": 3840,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/b7b1fad1-1bf8-4876-8523-c3a8238a815c.jpg?im_w=720"
                },
                {
                    "image_id": 3841,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/327bd95f-78c6-4b4d-8d19-663989f5b2c3.jpg?im_w=720"
                },
                {
                    "image_id": 3842,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/21a876d9-98d6-4fc3-81ef-4c5a3a8929fd.jpg?im_w=720"
                },
                {
                    "image_id": 3843,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/c5b1a385-f073-4021-b203-4066fa224908.jpg?im_w=720"
                },
                {
                    "image_id": 3844,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/785a8c74-0c32-495c-a86a-2340857cfcab.jpg?im_w=720"
                },
                {
                    "image_id": 3845,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/0ed1867d-6aad-485d-8704-be7964587da7.jpg?im_w=720"
                },
                {
                    "image_id": 3846,
                    "room_id": 372,
                    "url": "https://a0.muscache.com/im/pictures/b3c0546e-afd2-41f8-aca8-2fb270cbbc33.jpg?im_w=720"
                }
            ]
        },
        {
            "room_id": 422,
            "room_name": "Bike and trekking tours with locals",
            "latitude": 20.9689,
            "longitude": 105.922,
            "address_id": 22,
            "roomType": 4,
            "numGuest": 10,
            "numBed": 8,
            "numBedroom": 4,
            "numBathroom": 2,
            "rule": "Nhận phòng: Sau 15:00;Trả phòng: 12:00;Được phép mang theo thú cưng;Cho phép hút thuốc",
            "accommodationType": "Vệ sinh tăng cường",
            "confirmed": true,
            "rate": null,
            "host_id": 411,
            "price": 0,
            "image": [
                {
                    "image_id": 4378,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/763aff17-3449-4103-bedb-c0f14bb13669.jpg?im_w=720"
                },
                {
                    "image_id": 4379,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/27eca6a3-f8ef-4b90-b3ff-d9f5ead0ec6e.jpg?im_w=720"
                },
                {
                    "image_id": 4380,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/c33c9e5b-983f-4d39-a72d-f499fe323032.jpg?im_w=720"
                },
                {
                    "image_id": 4381,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/f7f78b98-7651-4356-81c1-3da4804d94ca.jpg?im_w=720"
                },
                {
                    "image_id": 4382,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/e0457929-c1ce-4a0c-bc29-7ddb799ec115.jpg?im_w=720"
                },
                {
                    "image_id": 4383,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/3de34c89-957c-4eca-8d94-724c195c59a0.jpg?im_w=720"
                },
                {
                    "image_id": 4384,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/49cc1ddb-6d56-470e-9edc-391cd3c0b515.jpg?im_w=720"
                },
                {
                    "image_id": 4385,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/e4697d9a-244b-41e6-b58b-e89ddabcc743.jpg?im_w=720"
                },
                {
                    "image_id": 4386,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/21265acf-f99a-49b0-873d-ebad1b3649f5.jpg?im_w=720"
                },
                {
                    "image_id": 4387,
                    "room_id": 422,
                    "url": "https://a0.muscache.com/im/pictures/e5fa452f-be11-4215-a946-fac4f1eabf28.jpg?im_w=720"
                }
            ]
        }
    ]
    const handleClick = (room) => {
        navigate(`/room/${room.room_id}`, {state: room} );
    }
    return (
        <Layout styleName="vh-100" containerStyleName="container-fluid">
            <div className="row">
                <div className="col col-12 col-lg-5">
                    <h2>{`Phòng ở tại ${place.description}`}</h2>
                    {results.map(room => {
                        return (
                            <div className="result-item">
                                <RoomCard key={room.room_id} room={room} onClick={() => {handleClick(room)}}/>
                            </div>
                        )
                    })}
                </div>
                <div className="col d-none d-lg-block col-lg-7 h-100 position-fixed end-0" >
                    <Map place={place} results={results}/>
                </div>
            </div>
        </Layout>
    )
}

export default SearchResultPage;