import { useState } from 'react';
import { User, Send } from 'lucide-react';

interface GuestData {
  guestsCount: number;
  guestNames: string[];
  needsAccommodation: boolean;
  needsTransfer: boolean;
  secondDay: boolean;
  notes: string;
}

export function GuestForm() {
  const [formData, setFormData] = useState<GuestData>({
    guestsCount: 1,
    guestNames: [],
    needsAccommodation: false,
    needsTransfer: false,
    secondDay: false,
    notes: ''
  });

  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [guestCountError, setGuestCountError] = useState(false); // для проверки guestCount

  const validateName = (name: string): boolean => {
    // Проверка: 3 слова, разделенных пробелами, начинаются с заглавной буквы, только русские буквы
    // const nameRegex = /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/;
    // return nameRegex.test(name);
    return name.length > 0;
  };

  const handleGuestsCountChange = (value: number) => {
    const count = Math.max(0, Math.min(20, value));
    setFormData(prev => ({
      ...prev,
      guestsCount: count,
      guestNames: Array(count).fill('').map((_, i) => prev.guestNames[i] || '')
    }));
    setErrors({});
    setGuestCountError(false); // сброс ошибки при изменении
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...formData.guestNames];
    newNames[index] = value;
    setFormData(prev => ({ ...prev, guestNames: newNames }));

    if (value && !validateName(value)) {
      setErrors(prev => ({ ...prev, [index]: 'Формат: Иванов Иван Иванович' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка, что есть хотя бы один гость
    if (formData.guestsCount === 0) {
      setGuestCountError(true);
      return;
    }

    const newErrors: { [key: number]: string } = {};

    // Валидация ФИО: если пустое или невалидное, ошибка
    formData.guestNames.forEach((name, index) => {
      if (!validateName(name)) {
        newErrors[index] = 'Формат: Иванов Иван Иванович';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Если чекбокс трансфер скрыт, ставим false
    const transferValue = formData.needsAccommodation ? false : formData.needsTransfer;

    const payload = {
      ...formData,
      needsTransfer: transferValue
    };

    try {
      // Отправка данных
      fetch(
          "https://script.google.com/macros/s/AKfycbx7z6mwJdug8I9jO7RD8HprTsQfS7YwHK-ksctrsKLTueiGhJJUdUaEjgvzUY9rOxAS/exec",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
            body: JSON.stringify(payload),
          }
      );

      // Считаем, что запись успешна
      setSubmitted(true);

      // Очистка формы
      setFormData({
        guestsCount: 1,
        guestNames: [],
        needsAccommodation: false,
        needsTransfer: false,
        secondDay: false,
        notes: ''
      });

      setErrors({});
      setGuestCountError(false);

      setTimeout(() => setSubmitted(false), 5000);

    } catch {
      // Игнорируем ошибки из-за CORS
      setSubmitted(true);
      setFormData({
        guestsCount: 1,
        guestNames: [],
        needsAccommodation: false,
        needsTransfer: false,
        secondDay: false,
        notes: ''
      });
      setErrors({});
      setGuestCountError(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {/* Количество гостей */}
        <div>
          <label className="block mb-2" style={{ color: 'var(--wedding-text)', fontFamily: 'var(--font-body)' }}>
            Количество гостей с Вами:
          </label>
          <input
              type="number"
              min="0"
              max="20"
              value={formData.guestsCount || ''}
              onChange={(e) => handleGuestsCountChange(parseInt(e.target.value) || 0)}
              placeholder="Введите количество гостей"
              className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none"
              style={{
                borderColor: guestCountError ? '#d4183d' : 'var(--wedding-accent)',
                fontFamily: 'var(--font-body)',
                backgroundColor: 'white'
              }}
          />
          {guestCountError && (
              <p className="text-sm mt-1" style={{ color: '#d4183d' }}>
                Укажите хотя бы одного гостя
              </p>
          )}
        </div>

        {/* Список гостей */}
        {formData.guestsCount > 0 && (
            <div className="space-y-4">
              <label className="block" style={{ color: 'var(--wedding-text)', fontFamily: 'var(--font-body)' }}>
                Список гостей:
              </label>
              {Array.from({ length: formData.guestsCount }).map((_, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-3">
                      <User size={20} style={{ color: 'var(--wedding-accent)', flexShrink: 0 }} />
                      <div className="flex-1">
                        <input
                            type="text"
                            value={formData.guestNames[index] || ''}
                            onChange={(e) => handleNameChange(index, e.target.value)}
                            placeholder="Иванов Иван Иванович"
                            className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none"
                            style={{
                              borderColor: errors[index] ? '#d4183d' : 'var(--wedding-accent)',
                              fontFamily: 'var(--font-body)',
                              backgroundColor: 'white'
                            }}
                        />
                      </div>
                    </div>
                    {errors[index] && (
                        <p className="text-sm ml-8" style={{ color: '#d4183d' }}>
                          {errors[index]}
                        </p>
                    )}
                  </div>
              ))}
            </div>
        )}

        {/* Чекбоксы */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
                type="checkbox"
                checked={formData.needsAccommodation}
                onChange={(e) => setFormData(prev => ({ ...prev, needsAccommodation: e.target.checked }))}
                className="min-w-5 min-h-5 rounded cursor-pointer"
                style={{ accentColor: 'var(--wedding-accent)' }}
            />
            <span style={{ color: 'var(--wedding-text)', fontFamily: 'var(--font-body)' }}>
            Необходим ли ночлег с 08.08.2026 на 09.08.2026?
          </span>
          </label>

          {!formData.needsAccommodation && (<label className="flex items-center gap-3 cursor-pointer">
            <input
                type="checkbox"
                checked={formData.needsTransfer}
                onChange={(e) => setFormData(prev => ({...prev, needsTransfer: e.target.checked}))}
                className="min-w-5 min-h-5 rounded cursor-pointer"
                style={{accentColor: 'var(--wedding-accent)'}}
            />
            <span style={{color: 'var(--wedding-text)', fontFamily: 'var(--font-body)'}}>
            Необходим ли трансфер до Минска по окончании дня свадьбы?
          </span>
          </label>)}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
                type="checkbox"
                checked={formData.secondDay}
                onChange={(e) => setFormData(prev => ({ ...prev, secondDay: e.target.checked }))}
                className="min-w-5 min-h-5 rounded cursor-pointer"
                style={{ accentColor: 'var(--wedding-accent)' }}
            />
            <span style={{ color: 'var(--wedding-text)', fontFamily: 'var(--font-body)' }}>
            Планируете ли остаться на второй день свадьбы?
          </span>
          </label>
        </div>

        {/* Дополнительные пометки */}
        <div>
          <label className="block mb-2" style={{ color: 'var(--wedding-text)', fontFamily: 'var(--font-body)' }}>
            Дополнительные пометки:
          </label>
          <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Напишите здесь любые дополнительные пожелания или информацию"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none resize-none"
              style={{
                borderColor: 'var(--wedding-accent)',
                fontFamily: 'var(--font-body)',
                backgroundColor: 'white'
              }}
          />
        </div>

        {/* Кнопка отправки */}
        <button
            type="submit"
            disabled={submitted}
            className={`
    w-full py-4 px-6 rounded-lg font-medium 
    transition-all duration-300 
    flex items-center justify-center gap-2 
    shadow-lg hover:shadow-xl 
    disabled:opacity-50 disabled:cursor-not-allowed
    ${submitted
                ? 'bg-[color-mix(in_srgb,var(--wedding-dark),black_30%)] cursor-default'
                : 'bg-[var(--wedding-dark)] hover:bg-[color-mix(in_srgb,var(--wedding-dark),black_20%)] cursor-pointer active:scale-95'
            }
  `}
            style={{
              color: 'white',
              fontFamily: 'var(--font-body)'
            }}
        >
          {submitted ? (
              <>✓ Отправлено!</>
          ) : (
              <>
                <Send size={20} />
                Отправить
              </>
          )}
        </button>
      </form>
  );
}