import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../assets';
import { Button, ButtonBgs, ButtonTypesEnum, FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from '../../uikit';
import './styles/style.scss';

export const Home = () => {
    const navigate = useNavigate()
    return (
        <section className="home">
            <div className="home__container container">
                <div className="home__content flex between align-center gap-16">
                    <div className="home__text">
                        <h1>
                            <Text
                                label='THE MATRIARCH AGENCY'
                                textStyles={{
                                    fontFamily: FontFamilyEnum.KUFAM,
                                    fontSize: FontSizesEnum.XX,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.BLACK,
                                    color: '#A97522'
                                }}
                            />
                        </h1>
                        <p>
                            <Text
                                label='Без лишних слов и представлений рады сообщить что Вы наконец-то, дождались! Новый сервис на теневых просторах, новые методы работы, запредельно новое качество! Не будем забывать, что всё новое - это забытое старое. По этому рады представить new level в сфере взлома почтовых аккаунтов и не только.'
                                textStyles={{
                                    fontFamily: FontFamilyEnum.INTER,
                                    fontSize: FontSizesEnum.M,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.REGULAR,
                                    color: '#CDBDAE'
                                }}
                            />
                        </p>
                        <Button
                            label="Наши услуги"
                            click={() => {}}
                            type={ButtonTypesEnum.DEFAULT}
                            gap={20}
                            bg={ButtonBgs.GOLD_GRADIENT}
                            textStyles={{
                                fontFamily: FontFamilyEnum.MONTSERRAT,
                                fontSize: FontSizesEnum.XL,
                                fontStyle: FontStyleEnum.NORMAL,
                                fontWeight: FontWeightEnum.SEMI_BOLD,
                                color: '#17110B'
                            }}
                        />
                    </div>
                    <div className="home__about">
                        <img src={IMAGES.column} alt="" />
                        <img src={IMAGES.column} alt="" />
                        <h4>
                            <Text
                                label='О компании'
                                textStyles={{
                                    fontFamily: FontFamilyEnum.INTER,
                                    fontSize: FontSizesEnum.XM,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.SEMI_BOLD,
                                    color: '#CDBDAE'
                                }}
                            />
                        </h4>
                        <p>
                            <Text
                                label='Lorem ipsum dolor sit amet consectetur. Tristique ut turpis iaculis volutpat amet. Est mauris morbi eu fermentum non eu aliquam nunc. Turpis lacinia diam tortor facilisis magna justo sit tincidunt. Consectetur accumsan vulputate ipsum nisi. Praesent consectetur in neque magna enim. Nisl bibendum accumsan ultrices nullam aenean in eros convallis. At diam velit ac interdum bibendum non aliquet. Ut sed sapien duis augue tristique sed viverra laoreet at. Feugiat risus erat mauris accumsan eu pellentesque nec mattis purus. Mauris lobortis sapien amet amet. In dapibus turpis a commodo dictum nunc. Urna risus enim viverra nunc laoreet.'
                                textStyles={{
                                    fontFamily: FontFamilyEnum.INTER,
                                    fontSize: FontSizesEnum.M,
                                    fontStyle: FontStyleEnum.NORMAL,
                                    fontWeight: FontWeightEnum.REGULAR,
                                    color: '#CDBDAE'
                                }}
                            />
                        </p>
                        <div className="home__about-buttons center flex gap-16">
                            <Button
                                label="Отзывы"
                                click={() => {navigate('/reviews')}}
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
                            <Button
                                label="Контакты"
                                click={() => {navigate('/contacts')}}
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
            </div>
        </section>
    )
}
