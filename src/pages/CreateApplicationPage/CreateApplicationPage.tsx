import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useGetParticipantsQuery, useCreateApplicationMutation } from '../../features/store';
import { ViewEnum } from '../../features/entities/applications';
import type { IView } from '../../features/entities/applications';
import type { IParticipant } from '../../features/entities/participant';
import { Button, Input, Text } from '../../core/uikit';
import type { ICreateFormValues } from './interfaces';
import styles from './styles/style.module.scss';

const VIEW_OPTIONS: IView[] = [
  { id: 1, type: ViewEnum.MY },
  { id: 2, type: ViewEnum.OTHER },
];

const initialValues: ICreateFormValues = {
  participant: null,
  view: null,
  city: '',
  isCheck: false,
  needEnabled: false,
  need: '',
  searchEnabled: false,
  search: '',
};

export function CreateApplicationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<ICreateFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ICreateFormValues | 'submit', string>>>({});
  const { data: participants = [], isLoading: participantsLoading } = useGetParticipantsQuery();
  const [createApplication, { isLoading: creating }] = useCreateApplicationMutation();

  const participantOptions = participants.map((p) => ({ value: p, label: p.name }));
  const viewOptions = VIEW_OPTIONS.map((v) => ({
    value: v,
    label: v.type === ViewEnum.MY ? 'Моя' : 'Чужая',
  }));

  const validateStep1 = (): boolean => {
    const nextErrors: typeof errors = {};
    if (!values.participant) nextErrors.participant = 'Выберите участника';
    if (!values.view) nextErrors.view = 'Выберите тип';
    if (!values.city.trim()) nextErrors.city = 'Введите город';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const nextErrors: typeof errors = {};
    if (values.needEnabled && !values.need.trim()) nextErrors.need = 'Заполните поле';
    setErrors((e) => ({ ...e, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const nextErrors: typeof errors = {};
    if (values.searchEnabled && !values.search.trim()) nextErrors.search = 'Заполните поле';
    setErrors((e) => ({ ...e, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    if (!values.participant || !values.view) return;
    try {
      await createApplication({
        participant: values.participant,
        view: values.view,
        city: values.city.trim(),
        isCheck: values.isCheck,
        need: values.needEnabled ? values.need.trim() : undefined,
        search: values.searchEnabled ? values.search.trim() : undefined,
      }).unwrap();
      navigate('/');
    } catch {
      setErrors((e) => ({ ...e, submit: 'Не удалось создать заявку' }));
    }
  };

  if (participantsLoading) return <div className={styles.placeholder}>Загрузка...</div>;

  return (
    <section className={styles.section}>
      <div className={styles.formCard}>
        <Text variant="title" as="h1" className={styles.title}>
          Создание заявки
        </Text>
        <Text variant="caption" className={styles.step}>
          Шаг {step} из 3
        </Text>

        {step === 1 && (
          <div className={styles.fields}>
            <div className={styles.field}>
              <label className={styles.label}>Участник</label>
              <Select<{ value: IParticipant; label: string }>
                placeholder="Выберите участника..."
                options={participantOptions}
                value={values.participant ? { value: values.participant, label: values.participant.name } : null}
                onChange={(opt) => setValues((v) => ({ ...v, participant: opt?.value ?? null }))}
                classNamePrefix="react-select"
                classNames={{
                  control: () => styles.selectControl,
                  menu: () => styles.selectMenu,
                }}
              />
              {errors.participant && <span className={styles.error}>{errors.participant}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Тип</label>
              <Select<{ value: IView; label: string }>
                placeholder="Выберите тип..."
                options={viewOptions}
                value={values.view ? { value: values.view, label: viewOptions.find((o) => o.value.id === values.view!.id)?.label ?? '' } : null}
                onChange={(opt) => setValues((v) => ({ ...v, view: opt?.value ?? null }))}
                classNamePrefix="react-select"
                classNames={{
                  control: () => styles.selectControl,
                  menu: () => styles.selectMenu,
                }}
              />
              {errors.view && <span className={styles.error}>{errors.view}</span>}
            </div>
            <Input
              label="Город"
              value={values.city}
              onChange={(e) => setValues((v) => ({ ...v, city: e.target.value }))}
              error={errors.city}
              placeholder="Город"
            />
            <Input
              label="Проверена"
              type="checkbox"
              checked={values.isCheck}
              onChange={(e) => setValues((v) => ({ ...v, isCheck: e.target.checked }))}
            />
          </div>
        )}

        {step === 2 && (
          <div className={styles.fields}>
            <Input
              label="Нужно?"
              type="checkbox"
              checked={values.needEnabled}
              onChange={(e) => setValues((v) => ({ ...v, needEnabled: e.target.checked }))}
            />
            {values.needEnabled && (
              <Input
                placeholder="Опишите, что нужно"
                value={values.need}
                onChange={(e) => setValues((v) => ({ ...v, need: e.target.value }))}
                error={errors.need}
              />
            )}
          </div>
        )}

        {step === 3 && (
          <div className={styles.fields}>
            <Input
              label="Нужно?"
              type="checkbox"
              checked={values.searchEnabled}
              onChange={(e) => setValues((v) => ({ ...v, searchEnabled: e.target.checked }))}
            />
            {values.searchEnabled && (
              <Input
                placeholder="Опишите, что нужно"
                value={values.search}
                onChange={(e) => setValues((v) => ({ ...v, search: e.target.value }))}
                error={errors.search}
              />
            )}
          </div>
        )}

        {errors.submit && <span className={styles.error}>{errors.submit}</span>}

        <div className={styles.actions}>
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Назад
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext}>Далее</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={creating}>
              {creating ? 'Создание...' : 'Создать'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
