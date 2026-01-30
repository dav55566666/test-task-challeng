import './styles/style.scss';
import { FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from "../../uikit"
import { ReviewIcon } from '../../assets';
import { reviewsData } from './datas';
import { ReviewItem } from '../ReviewItem';

export const Reviews = () => {
    return (
        <section className="reviews">
            <div className="reviews__container container">
                <div className="reviews__content">
                    <div className="reviews__box">
                        <div className="reviews__box-title">
                            <h2>
                                <ReviewIcon />
                                <Text
                                    label='Мы в СМИ'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.RUBIK,
                                        fontSize: FontSizesEnum.XL,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.BLACK,
                                        color: '#A97522'
                                    }}
                                />
                            </h2>
                            <p>
                                <Text
                                    label='Время от времени наши сотрудники делятся мнением и впечатлениями о актуальных новостях с журналистами авторитетных изданий.'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </p>
                        </div>
                        <div className="reviews__list">
                            {
                                reviewsData.map(el => (
                                    <ReviewItem key={el.id} title={el.title} description={el.description} id={el.id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="reviews__box">
                        <div className="reviews__box-title">
                            <h2>
                                <ReviewIcon />
                                <Text
                                    label='Мы в интернете'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.RUBIK,
                                        fontSize: FontSizesEnum.XL,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.BLACK,
                                        color: '#A97522'
                                    }}
                                />
                            </h2>
                            <p>
                                <Text
                                    label='В связи со спецификой работы мы ни в коем случае не настаиваем на написании отзывов, поэтому большинство наших довольных клиентов остается в тени. Тем не менее, работая на форумах с 2014 года мы накопили немалое кол-во отзывов от тех клиентов, кто по собственной инициативе оценил уровень нашей работы в письменном виде. Все отзывы настоящие, в чем вы можете убедиться перейдя в источник нажав на доменный адрес.'
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.INTER,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.REGULAR,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </p>
                        </div>
                        <div className="reviews__list">
                            {
                                reviewsData.map(el => (
                                    <ReviewItem key={el.id} title={el.title} description={el.description} id={el.id} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
