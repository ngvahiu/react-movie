import React, { useEffect, useRef, useState } from 'react';
import './Seats.scss';
import ColumnsGrid from '../../components/ColumnsGrid/ColumnsGrid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingTicketAction, setTicketListAction } from '../../redux/reducers/TicketManagementReducer/TicketManagementActions';
import { CHOOSE_SEAT } from '../../redux/reducers/TicketManagementReducer/TicketManagementTypes';
import Swal from 'sweetalert2';

const logoPayment = [
    'cash',
    'momo',
    'zalopay',
    'paypal',
    'payoo',
    'masterCard',
    'techcombank',
    'vietcombank',
    'vietinbank',
]
function Seats({ danhSachGhe, choosingSeats, user }) {
    const dispatch = useDispatch();

    return (
        <div className='container mx-auto'>
            <div className='pt-5 w-full'>
                <div className="flex flex-col items-center mt-5 w-full">
                    <div className="bg-black screen">
                    </div>
                    <div className='trapezoid text-center'>
                        <h3 className="mt-3 text-orange-500">SCREEN</h3>
                    </div>
                    <div className='mt-2 grid grid-cols-16 lg:gap-7 md:gap-3 gap-2'>
                        {danhSachGhe?.map((ghe) => {
                            if (ghe.taiKhoanNguoiDat === user?.taiKhoan) {
                                return <div className='flex flex-col items-center' key={ghe.maGhe}>
                                    <span className='md:text-base text-xs seat'>{ghe.tenGhe}</span>
                                    <i className="fa fa-couch md:text-sm text-xs cursor-not-allowed seat" style={{
                                        color: '#6DEE6D'
                                    }}></i>
                                </div>
                            }
                            if (choosingSeats?.findIndex(seat => seat.maGhe === ghe.maGhe) !== -1) {
                                return <div className='flex flex-col items-center' key={ghe.maGhe} onClick={() => {
                                    dispatch({
                                        type: CHOOSE_SEAT,
                                        payload: ghe
                                    })
                                }}>
                                    <span className='md:text-base text-xs seat'>{ghe.tenGhe}</span>
                                    <i className="fa fa-couch md:text-sm text-xs cursor-pointer seat" style={{
                                        color: '#f3f727'
                                    }}></i>
                                </div>
                            }
                            if (ghe.daDat) {
                                return <div className='flex flex-col items-center' key={ghe.maGhe}>
                                    <span className='md:text-base text-xs seat'>{ghe.tenGhe}</span>
                                    <i className="fa fa-couch md:text-sm text-xs cursor-not-allowed seat" style={{
                                        color: '#b2a9a9'
                                    }}></i>
                                </div>
                            }
                            if (ghe.loaiGhe === 'Vip') {
                                return <div className='flex flex-col items-center' key={ghe.maGhe} onClick={() => {
                                    dispatch({
                                        type: CHOOSE_SEAT,
                                        payload: ghe
                                    })
                                }}>
                                    <span className='md:text-base text-xs seat'>{ghe.tenGhe}</span>
                                    <i className="fa fa-couch md:text-sm text-xs cursor-pointer seat" style={{
                                        color: '#ff0000'
                                    }}></i>
                                </div>
                            }
                            return <div className='flex flex-col items-center' onClick={() => {
                                dispatch({
                                    type: CHOOSE_SEAT,
                                    payload: ghe
                                })
                            }} key={ghe.maGhe}>
                                <span className='md:text-base text-xs seat'>{ghe.tenGhe}</span>
                                <i className="fa fa-couch md:text-sm text-xs cursor-pointer seat"></i>
                            </div>
                        })}
                    </div>
                    <div className='mt-4 w-4/5'>
                        <h3 className='md:text-xl text-lg font-bold'>NOTE:</h3>
                        <div className='ml-16'>
                            <div className='flex justify-start items-center'>
                                <button className='seat' style={{ marginRight: '1rem' }}></button>
                                <span className='md:text-lg text-sm'>
                                    Normal seat: <i className="fa fa-couch md:text-sm text-xs cursor-pointer"></i>
                                </span>
                            </div>
                            <div className='flex justify-start items-center'>
                                <button className='seat vipSeat' style={{ marginRight: '1rem' }}></button>
                                <span className='md:text-lg text-sm'>
                                    Vip seat: <i className="fa fa-couch md:text-sm text-xs cursor-pointer" style={{
                                        color: '#ff0000'
                                    }}></i>
                                </span>
                            </div>
                            <div className='flex justify-start items-center'>
                                <button className='seat orderedSeat' style={{ marginRight: '1rem' }}></button>
                                <span className='md:text-lg text-sm'>
                                    Ordered seat: <i className="fa fa-couch md:text-sm text-xs cursor-not-allowed" style={{
                                        color: '#b2a9a9'
                                    }}></i>
                                </span>
                            </div>
                            <div className='flex justify-start items-center'>
                                <button className='seat orderedSeatByUser' style={{ marginRight: '1rem' }}></button>
                                <span className='md:text-lg text-sm'>
                                    You already ordered: <i className="fa fa-couch md:text-sm text-xs cursor-pointer" style={{
                                        color: '#6DEE6D'
                                    }}></i>
                                </span>
                            </div>
                            <div className='flex justify-start items-center'>
                                <button className='seat orderedSeatByOthers' style={{ marginRight: '1rem' }}></button>
                                <span className='md:text-lg text-sm'>
                                    You are choosing: <i className="fa fa-couch md:text-sm text-xs cursor-not-allowed" style={{
                                        color: '#f3f727'
                                    }}></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

function Information({ choosingSeats, tenCumRap, diaChi, tenRap, ngayChieu, gioChieu, hinhAnh, tenPhim, handleClick }) {
    const renderSeats = () => {
        let result = choosingSeats?.reduce((result, seat) => {
            return result += (seat.tenGhe + '-')
        }, '');

        return result.substring(0, result.length - 1);
    }
    return <div className='flex justify-center w-full'>
        <div className='rounded-xl border border-1 border-gray-300 shadow-xl px-8 py-4 form'>
            <div className='text-green-300 text-center text-4xl total'>
                {
                    choosingSeats?.reduce((total, seat) => {
                        return total += seat.giaVe;
                    }, 0).toLocaleString() + 'VND'
                }
            </div>
            <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                <span>Cinema: </span>
                <span className='text-green-500'>{tenCumRap}</span>
            </div>
            <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                <span>Address: </span>
                <span className='text-green-500'>{diaChi}</span>
            </div>
            <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                <span>Cinema name: </span>
                <span className='text-green-500'>{tenRap}</span>
            </div>
            <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                <span>Showtime: </span>
                <span className='text-green-500'>{ngayChieu}-<span className='text-orange-500'>{gioChieu}</span></span>
            </div>
            <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                <span>Film: </span>
                <div className='flex items-center'>
                    <img className='mr-2' src={hinhAnh} alt={tenPhim} style={{
                        width: 50,
                        height: 50
                    }} />
                    <span className='text-green-500'>{tenPhim}</span>
                </div>
            </div>
            <div className='py-3 border border-gray-200 border-y-1 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                <span>Chosen seats: </span>
                <div className='text-green-500'>
                    {renderSeats()}
                </div>
            </div>
            <button className='w-full text-white sm:py-4 py-3 sm:text-base text-sm bg-orange-500 hover:bg-black transition-all duration-500' onClick={() => handleClick("next")}>CHECKOUT</button>
        </div>
    </div>
}

function Checkout({ user, showtimeID, choosingSeats }) {
    const [activeLogo, setActiveLogo] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='flex justify-center w-full'>
            <div className='rounded-xl border border-1 border-gray-300 shadow-xl px-8 py-4 form'>
                <div className='py-3 border border-gray-200 border-y-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                    <span>Username: </span>
                    <span className='text-green-500'>{user.taiKhoan}</span>
                </div>
                <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                    <span>Full name: </span>
                    <span className='text-green-500'>{user.hoTen}</span>
                </div>
                <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                    <span>Email: </span>
                    <span className='text-green-500'>{user.email}</span>
                </div>
                <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                    <span>Phone number: </span>
                    <span className='text-green-500'>{user.soDT}</span>
                </div>
                <div className='py-3 border border-gray-200 border-t-1 border-b-0 border-x-0 flex justify-between sm:text-base text-sm text-fixed-1'>
                    <span>Payment method: </span>
                    <div className='grid grid-cols-3'>
                        {
                            logoPayment.map((logo, index) => {
                                return <img className={'mx-2 my-1 border border-2 cursor-pointer hover:border-blue-300 sm:w-[70px] sm:h-[70px]  w-[50px] h-[50px] ' + (activeLogo === index ? 'border-blue-300' : '')} src={require(`../../assets/${logo}.png`)} alt='logo' key={index} onClick={() => setActiveLogo(index)} />
                            })
                        }
                    </div>
                </div>
                <button className='w-full text-white sm:py-4 py-3 sm:text-base text-sm bg-orange-500 hover:bg-black transition-all duration-500' onClick={async () => {
                    await dispatch(bookingTicketAction(showtimeID, choosingSeats));

                    await Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Pay successfully !',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    navigate("/");
                }}>PAY</button>
            </div>
        </div>
    )
}

export default function HorizontalLinearStepper() {
    const { id: showtimeID } = useParams();
    const { ticketList } = useSelector(state => state.TicketManagementReducer);
    const { choosingSeats } = useSelector(state => state.TicketManagementReducer);
    const { user } = useSelector(state => state.UserReducer);
    const [currentStep, setCurrentStep] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = setTicketListAction(showtimeID);

        dispatch(action);
    }, [])

    const stepArray = [
        "Choose seats",
        "Check information",
        "Checkout"
    ];
    const handleClick = (clickType) => {
        let newStep = currentStep;
        (clickType == "next") ? newStep++ : newStep--;
        // Check if steps are within the boundary
        if (newStep > 0 && newStep <= stepArray.length) {
            setCurrentStep(newStep)
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: {
                return <Seats danhSachGhe={ticketList?.danhSachGhe} choosingSeats={choosingSeats} user={user} />
            }
            case 2: {
                return <Information choosingSeats={choosingSeats} tenCumRap={ticketList?.thongTinPhim?.tenCumRap} diaChi={ticketList?.thongTinPhim?.diaChi} tenRap={ticketList?.thongTinPhim?.tenRap} ngayChieu={ticketList?.thongTinPhim?.ngayChieu} gioChieu={ticketList?.thongTinPhim?.gioChieu} hinhAnh={ticketList?.thongTinPhim?.hinhAnh} tenPhim={ticketList?.thongTinPhim?.tenPhim} handleClick={handleClick} />
            }
            case 3: {
                return <Checkout user={user} showtimeID={showtimeID} choosingSeats={choosingSeats} />
            }
            default:
        }
    }

    return (
        <div className='bg-white py-5'>
            <ColumnsGrid hinhAnh={ticketList?.thongTinPhim?.hinhAnh} tenCumRap={ticketList?.thongTinPhim?.tenCumRap} diaChi={ticketList?.thongTinPhim?.diaChi} tenRap={ticketList?.thongTinPhim?.tenRap} ngayChieu={ticketList?.thongTinPhim?.ngayChieu} gioChieu={ticketList?.thongTinPhim?.gioChieu} />

            <div className="container mx-auto mt-5 mb-12">
                <Stepper
                    steps={stepArray}
                    currentStepNumber={currentStep}
                />
            </div>
            <div className='container mx-auto'>
                {renderStepContent()}
            </div>
            <div className="flex justify-center my-5">
                <button onClick={() => handleClick()} className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-orange-700 hover:bg-orange-900 text-white font-normal md:py-2 md:px-4 py-1 px-2 md:text-base text-sm mr-1 rounded"> Previous </button>
                <button onClick={() => handleClick("next")} className={"btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-orange-700 hover:bg-orange-700 text-orange-700 hover:text-white font-normal md:py-2 md:px-4 py-1 px-2 md:text-base text-sm rounded " + (choosingSeats.length === 0 ? "cursor-not-allowed" : "")} disabled={choosingSeats.length === 0}> {(currentStep === stepArray.length) ? 'Finish' : 'Next'} </button>
            </div>
        </div>
    );
};

const Stepper = ({ steps, currentStepNumber }) => {
    const [stepperSteps, setStep] = useState([]);
    const stepsStateRef = useRef();
    useEffect(() => {
        const stepsState = steps.map((step, index) => {
            const stepObj = {};
            stepObj.description = step;
            stepObj.completed = false;
            stepObj.highlighted = index === 0 ? true : false;
            stepObj.selected = index === 0 ? true : false;
            return stepObj;
        });
        stepsStateRef.current = stepsState;
        const currentSteps = updateStep(currentStepNumber - 1, stepsState)
        setStep(currentSteps)
    }, []);
    useEffect(() => {
        const currentSteps = updateStep(currentStepNumber - 1, stepsStateRef.current)
        setStep(currentSteps)
    }, [currentStepNumber]);
    function updateStep(stepNumber, steps) {
        const newSteps = [...steps];
        let stepCounter = 0;
        while (stepCounter < newSteps.length) {
            //current step 
            if (stepCounter === stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: true,
                    selected: true,
                    completed: false
                };
                stepCounter++;
            }
            // Past step
            else if (stepCounter < stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: true,
                    completed: true
                };
                stepCounter++;
            }
            // Future steps 
            else {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: false,
                    completed: false
                }
                stepCounter++;
            }
        }
        return newSteps
    }
    const stepsDisplay = stepperSteps.map((step, index) => {
        return (
            <div key={index}
                className={index !== stepperSteps.length - 1 ? "w-full flex items-center" : "flex items-center"} >
                <div className="relative flex flex-col items-center text-teal-600">
                    <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 md:h-12 md:w-12 h-8 w-8 flex items-center justify-center md:py-3 py-1 step ${step.selected ? "bg-red-600 text-white font-bold" : ""}`}>
                        {step.completed ? <span className="text-white font-bold text-xl">✓</span> : index + 1}
                    </div>
                    <div className={`absolute top-0  text-center md:mt-16 mt-8 text-xs font-medium uppercase step ${step.highlighted ? "text-gray-900" : "text-gray-400"}`}> {step.description}	</div>
                </div>
                <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300 "> </div>
            </div>
        )
    })
    return (
        <div className="md:px-24 px-10 py-4 flex justify-between items-center">
            {stepsDisplay}
        </div>
    )
}

