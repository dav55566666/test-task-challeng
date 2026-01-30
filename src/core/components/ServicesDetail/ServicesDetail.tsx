import { useNavigate, useParams } from 'react-router-dom';
import './styles/style.scss';
import { IMAGES } from '../../assets';
import { Button, ButtonBgs, ButtonTypesEnum, FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from '../../uikit';
import { servicesData } from '../SideBar';

export const ServicesDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate()
    return (
        <section className="services-detail">
            <div className="services-detail__container container">
                <div className="services-detail__content">
                    <div className="bg-images">
                        <img src={IMAGES.column} alt="" />
                        <img src={IMAGES.column} alt="" />
                    </div>
                    <div className="services-detail__title">
                        <h2>
                            <img src={IMAGES.logo} alt="" />
                            <Text
                                label={servicesData.find(el => el.slug === slug)?.title || ''}
                                textStyles={{
                                    fontFamily: FontFamilyEnum.INTER,
                                    fontSize: FontSizesEnum.XM,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.SEMI_BOLD,
                                    color: '#CDBDAE'
                                }}
                            />
                        </h2>
                        <p>
                            <Text
                                label='В эру технологического прогресса стало практически невозможным сделать что-то незамеченным. Все заносится в соответствующие базы, на любого человека можно поднять досье. Найти информацию, установить связи, местонахождение – благодаря огромному кол-ву контактов, как на постсоветском пространстве так и в мире, нам подвластно решение самых сложных задач по поиску и обнаружению которые Вы можете поставить.'
                                textStyles={{
                                    fontFamily: FontFamilyEnum.INTER,
                                    fontSize: FontSizesEnum.L,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.REGULAR,
                                    color: '#CDBDAE'
                                }}
                            />
                        </p>
                    </div>
                    <div className="services-detail__info">
                        <h4 className="info-title">
                            <Text
                                label='От самого простого:'
                                textStyles={{
                                    fontFamily: FontFamilyEnum.INTER,
                                    fontSize: FontSizesEnum.S,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.REGULAR,
                                    color: '#FBE869'
                                }}
                            />
                        </h4>
                        <div className="services-detail__grid">
                            <div className="services-detail__item">
                                <Text
                                    label='Информация о владельце мобильного номера'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </div>
                            <div className="services-detail__item">
                                <Text
                                    label='Информация о владельце авто по гос номерам'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </div>
                            <div className="services-detail__item">
                                <Text
                                    label='Информация о местонахождении/маршрутах абонента'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </div>
                            <div className="services-detail__item">
                                <Text
                                    label='Информация о пересечениях границы'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="services-detail__info">
                        <h4 className="info-title">
                            <Text
                                label='До комплексных задач:'
                                textStyles={{
                                    fontFamily: FontFamilyEnum.INTER,
                                    fontSize: FontSizesEnum.S,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.REGULAR,
                                    color: '#FBE869'
                                }}
                            />
                        </h4>
                        <div className="services-detail__grid">
                            <div className="services-detail__item">
                                <Text
                                    label='Поиск/установление/сопровождение'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </div>
                            <div className="services-detail__item">
                                <Text
                                    label='Наружное наблюдение в любой точке мира'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </div>
                            <div className="services-detail__item">
                                <Text
                                    label='Установление деловых и личных связей/Выявление "кротов"'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </div>
                            <div className="services-detail__item">
                                <Text
                                    label='Поиск и привлечение к ответственности мошенников'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="services-detail__bottom">
                        <p>
                            <Text
                                label='Поиск людей по всему миру, должники/пропавшие/друзья/враги – найдем всех, установим все данные, от распорядка дня и клички домашнего питомца до ведения двойной жизни/работы. Эксклюзивные информационные возможности. Контакты по всему миру. Запрос в любую структуру.'
                                textStyles={{
                                    fontFamily: FontFamilyEnum.INTER,
                                    fontSize: FontSizesEnum.L,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.REGULAR,
                                    color: '#CDBDAE'
                                }}
                            />
                        </p>
                        <Button
                            label="Контакты"
                            click={() => { navigate('/contacts') }}
                            type={ButtonTypesEnum.DEFAULT}
                            gap={20}
                            bg={ButtonBgs.DARK_BROWN}
                            textStyles={{
                                fontFamily: FontFamilyEnum.MONTSERRAT,
                                fontSize: FontSizesEnum.XL,
                                fontStyle: FontStyleEnum.NORMAL,
                                fontWeight: FontWeightEnum.SEMI_BOLD,
                                color: '#CDBDAE'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
