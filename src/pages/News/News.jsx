import React, { useEffect, useRef, useState } from 'react'
import { Tabs } from 'antd';
import './News.scss'
import { Animated } from 'react-animated-css';

const data = [
    {
        label: '24H MOVIE',
        content: [
            {
                image: "https://s3img.vcdn.vn/123phim/2020/07/tenet-cong-bo-ngay-khoi-chieu-chinh-thuc-tai-viet-nam-15959320391357.png",
                title: "10 Gương mặt có màn thể hiện xuất chúng DCEU từng có",
                description: "DCEU cũng đã sắp sửa kết thúc, nhưng dàn sao đã tạo dựng nên vũ trụ đã truyền rất nhiều cảm hứng cho khán giả."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2020/07/khi-phu-nu-khong-con-o-the-tron-chay-cua-nan-nhan-15943683481617.jpg",
                title: "Khi phụ nữ không còn ở thế trốn chạy của nạn nhân",
                description: "Lấy cảm hứng từ web drama Chuyện Xóm Tui, phiên bản điện ảnh sẽ mang một màu sắc hoàn toàn khác: hài hước hơn, gần gũi và nhiều cảm xúc hơn Bộ phim là câu chuyện của Nhót - người phụ nữ “chưa kịp già” đã sắp bị mãn kinh, vội vàng đi tìm chồng. Nhưng sâu thẳm trong cô, là khao khát muốn có một đứa con và luôn muốn hàn gắn với người cha suốt ngày say xỉn của mình."
            },
            {
                image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/04/fan-art-of-adam-driver-as-reed-richards-in-marvel-s-fanatstic-four.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
                title: "Adam Driver As Reed Richards In MCU Fantastic Four Fan Art Makes A Case For This Marvel Casting",
                description: "New stunning fan art of Adam Driver as Reed Richards in the Marvel Cinematic Universe's Fantastic Four makes a compelling case for this possible Marvel casting. Driver is an accomplished actor who rose to fame playing Kylo Ren, the villain-turned-hero of Disney's Star Wars sequel trilogy."
            },
            {
                image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/04/denzel-washington-as-robert-mccall-looking-serious-in-the-equalizer-2.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
                title: "Denzel Washington Is Pulled Back Into Action In New Equalizer 3 Footage Details",
                description: "Sony has revealed new footage for The Equalizer 3. A follow-up to 2018 The Equalizer 2, The Equalizer 3 will see Denzel Washington return to action as Robert McCall. While not much has been disclosed about the movie, the highly-anticipated action movie is slated to release on September 1, 2023."
            },
            {
                image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/04/denzel-washington-equalizer-3.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
                title: "The Equalizer 3 Trailer: Denzel Washington & Dakota Fanning Reunite In Violent Trilogy-Ender",
                description: "Denzel Washington is back as Robert McCall in the trailer for The Equalizer 3. The upcoming film reunites Washington with director Antoine Fuqua, who also helmed the first two installments in the franchise. The Equalizer 3 also stars Dakota Fanning, who worked with Washington nearly two decades ago in the 2004 movie Man on Fire."
            }
        ]
    },
    {
        label: 'REVIEWS',
        content: [
            {
                image: "https://s3img.vcdn.vn/123phim/2020/03/review-nang-3-loi-hua-cua-cha-cau-chuyen-tinh-than-cam-dong-cua-kha-nhu-va-kieu-minh-tuan-15834049872311.jpg",
                title: "10 Gương mặt có màn thể hiện xuất chúng DCEU từng có",
                description: "DCEU cũng đã sắp sửa kết thúc, nhưng dàn sao đã tạo dựng nên vũ trụ đã truyền rất nhiều cảm hứng cho khán giả."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2020/03/review-onward-khi-phep-thuat-manh-me-nhat-chinh-la-tinh-than-15832047938817.jpg",
                title: "Khi phụ nữ không còn ở thế trốn chạy của nạn nhân",
                description: "Lấy cảm hứng từ web drama Chuyện Xóm Tui, phiên bản điện ảnh sẽ mang một màu sắc hoàn toàn khác: hài hước hơn, gần gũi và nhiều cảm xúc hơn Bộ phim là câu chuyện của Nhót - người phụ nữ “chưa kịp già” đã sắp bị mãn kinh, vội vàng đi tìm chồng. Nhưng sâu thẳm trong cô, là khao khát muốn có một đứa con và luôn muốn hàn gắn với người cha suốt ngày say xỉn của mình."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2020/02/review-ke-vo-hinh-con-gi-dang-so-hon-ke-giet-nguoi-benh-hoan-vo-hinh-15828835353362.jpg",
                title: "Adam Driver As Reed Richards In MCU Fantastic Four Fan Art Makes A Case For This Marvel Casting",
                description: "New stunning fan art of Adam Driver as Reed Richards in the Marvel Cinematic Universe's Fantastic Four makes a compelling case for this possible Marvel casting. Driver is an accomplished actor who rose to fame playing Kylo Ren, the villain-turned-hero of Disney's Star Wars sequel trilogy."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2020/02/review-cau-be-ma-2-ban-trai-cua-be-beo-la-day-chu-dau-xa-15823608583110.jpg",
                title: "Denzel Washington Is Pulled Back Into Action In New Equalizer 3 Footage Details",
                description: "Sony has revealed new footage for The Equalizer 3. A follow-up to 2018 The Equalizer 2, The Equalizer 3 will see Denzel Washington return to action as Robert McCall. While not much has been disclosed about the movie, the highly-anticipated action movie is slated to release on September 1, 2023."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2020/02/review-nhim-sonic-cuoi-tha-ga-cung-chang-nhim-sieu-thanh-lay-loi-15821907793369.jpg",
                title: "The Equalizer 3 Trailer: Denzel Washington & Dakota Fanning Reunite In Violent Trilogy-Ender",
                description: "Denzel Washington is back as Robert McCall in the trailer for The Equalizer 3. The upcoming film reunites Washington with director Antoine Fuqua, who also helmed the first two installments in the franchise. The Equalizer 3 also stars Dakota Fanning, who worked with Washington nearly two decades ago in the 2004 movie Man on Fire."
            }
        ]
    },
    {
        label: 'PROMOTION',
        content: [
            {
                image: "https://s3img.vcdn.vn/123phim/2019/10/123phim-nhap-ma-bkt-giam-ngay-20k-khi-dat-ve-bac-kim-thang-15712976725554.jpg",
                title: "10 Gương mặt có màn thể hiện xuất chúng DCEU từng có",
                description: "DCEU cũng đã sắp sửa kết thúc, nhưng dàn sao đã tạo dựng nên vũ trụ đã truyền rất nhiều cảm hứng cho khán giả."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2019/08/sinh-nhat-mega-gs-15663933683466.jpg",
                title: "Khi phụ nữ không còn ở thế trốn chạy của nạn nhân",
                description: "Lấy cảm hứng từ web drama Chuyện Xóm Tui, phiên bản điện ảnh sẽ mang một màu sắc hoàn toàn khác: hài hước hơn, gần gũi và nhiều cảm xúc hơn Bộ phim là câu chuyện của Nhót - người phụ nữ “chưa kịp già” đã sắp bị mãn kinh, vội vàng đi tìm chồng. Nhưng sâu thẳm trong cô, là khao khát muốn có một đứa con và luôn muốn hàn gắn với người cha suốt ngày say xỉn của mình."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2019/05/123phim-tixshop-tro-lai-qua-xin-hon-xua-15583511037699.jpg",
                title: "Adam Driver As Reed Richards In MCU Fantastic Four Fan Art Makes A Case For This Marvel Casting",
                description: "New stunning fan art of Adam Driver as Reed Richards in the Marvel Cinematic Universe's Fantastic Four makes a compelling case for this possible Marvel casting. Driver is an accomplished actor who rose to fame playing Kylo Ren, the villain-turned-hero of Disney's Star Wars sequel trilogy."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2019/05/galaxy-trang-thi-xem-phim-hay-say-qua-tang-15572160162243.jpg",
                title: "Denzel Washington Is Pulled Back Into Action In New Equalizer 3 Footage Details",
                description: "Sony has revealed new footage for The Equalizer 3. A follow-up to 2018 The Equalizer 2, The Equalizer 3 will see Denzel Washington return to action as Robert McCall. While not much has been disclosed about the movie, the highly-anticipated action movie is slated to release on September 1, 2023."
            },
            {
                image: "https://s3img.vcdn.vn/123phim/2019/04/mua-2-ve-cinestar-qua-zalopay-chi-1-000d-ve-15563607309238.jpg",
                title: "The Equalizer 3 Trailer: Denzel Washington & Dakota Fanning Reunite In Violent Trilogy-Ender",
                description: "Denzel Washington is back as Robert McCall in the trailer for The Equalizer 3. The upcoming film reunites Washington with director Antoine Fuqua, who also helmed the first two installments in the franchise. The Equalizer 3 also stars Dakota Fanning, who worked with Washington nearly two decades ago in the 2004 movie Man on Fire."
            }
        ]
    }
]
function News() {
    const [isVisible, setIsVisible] = useState(false);
    const myRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // set animation
    const handleScroll = () => {
        if (myRef.current && !hasAnimated) {
            const top = myRef.current.getBoundingClientRect().top;
            if (top + 100 <= window.innerHeight) {
                setIsVisible(true);
                setHasAnimated(true);
            }
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        //remove eventListener when the animation occurs first time.
        if (hasAnimated) {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [hasAnimated]);

    return (
        <div ref={myRef} id='news' className='flex justify-center py-10'>
            <Animated className='flex justify-center' animationIn="fadeInRight" isVisible={isVisible} animationInDuration={2000}>
                <Tabs
                    defaultActiveKey="1"
                    centered
                    items={data.map((item, index) => {
                        return {
                            label: item.label,
                            key: index,
                            children: <div className='flex flex-col items-center justify-center'>
                                <div className='grid grid-cols-2'>
                                    {
                                        item?.content?.slice(0, 2).map((data, index) => {
                                            return <div className='flex flex-col items-center justify-center cursor-pointer transition-all duration-500 news-top' key={index}>
                                                <img className='h-[200px]' src={data.image} alt={data.image} style={{
                                                    width: '90%'
                                                }} />
                                                <h1 className='text-white lg:text-lg text-sm font-bold transition-all duration-500' style={{
                                                    width: '90%'
                                                }}>{data.title}</h1>
                                                <p className='text-gray-500 lg:text-sm text-xs' style={{
                                                    width: '90%'
                                                }}>{data.description.length > 200 ? data.description.slice(0, 200) + '...' : data.description}</p>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className='grid grid-cols-3 gap-3 mt-5'>
                                    {
                                        item?.content?.slice(2, 5).map((data, index) => {
                                            return <div className='flex flex-col items-center justify-center cursor-pointer transition-all duration-500 news-bottom' key={index}>
                                                <img className='h-[150px]' src={data.image} alt={data.image} style={{
                                                    width: '90%'
                                                }} />
                                                <h1 className='text-white lg:text-lg text-sm font-bold transition-all duration-500' style={{
                                                    width: '90%'
                                                }}>{data.title}</h1>
                                                <p className='text-gray-500 lg:text-sm text-xs' style={{
                                                    width: '90%'
                                                }}>{data.description.length > 200 ? data.description.slice(0, 200) + '...' : data.description}</p>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    })}
                    style={{
                        width: '80%',
                        color: "#fff",
                        fontSize: '3rem'
                    }}
                />
            </Animated>
        </div>
    )
}

export default News