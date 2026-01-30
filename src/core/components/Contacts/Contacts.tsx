import { BulbIcon, ContactIcon, EmailIcon, TgBigIcon } from "../../assets"
import { FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from "../../uikit"
import { ContactItem } from "../ContactItem"
import './styles/style.scss';

export const Contacts = () => {
    return (
        <section className="contacts">
            <div className="contacts__container container">
                <div className="contacts__content">
                    <div className="contacts__slug">
                        <Text
                            label={'Скопированно'}
                            textStyles={{
                                fontFamily: FontFamilyEnum.INTER,
                                fontSize: FontSizesEnum.L,
                                fontStyle: FontStyleEnum.NORMAL,
                                fontWeight: FontWeightEnum.SEMI_BOLD,
                                color: '#17110B'
                            }}
                        />
                    </div>
                    <h1>
                        <ContactIcon />
                        <Text
                            label='Контакты'
                            textStyles={{
                                fontFamily: FontFamilyEnum.INTER,
                                fontSize: FontSizesEnum.XX,
                                fontStyle: FontStyleEnum.NORMAL,
                                fontWeight: FontWeightEnum.BLACK,
                                color: '#A97522'
                            }}
                        />
                    </h1>
                    <div className="contacts__items">
                        <ContactItem
                            title="Telegram"
                            value="По базовым вопросам"
                            Icon={<TgBigIcon />}
                            isActive={false}
                        />
                        <ContactItem
                            title="Telegram"
                            value="По индивидуальным вопросам"
                            Icon={<TgBigIcon />}
                            isActive={false}
                        />
                        <ContactItem
                            title="Jabber"
                            value="Example@jabber.com"
                            Icon={<BulbIcon />}
                            isActive={true}
                        />
                        <ContactItem
                            title="Email"
                            value="Example@example.com"
                            Icon={<EmailIcon />}
                            isActive={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
