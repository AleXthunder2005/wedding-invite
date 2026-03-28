import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Heart, Home, MapPin, Wine, Church, Flame, Music, Sparkles } from 'lucide-react';
import { WeddingTimer } from './components/WeddingTimer';
import { GuestForm } from './components/GuestForm';
import photo from './assets/md.jpg'

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--wedding-primary)';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  
  const forbiddenColors = [
    { color: '#FE0000', name: 'Красный' },
    { color: '#FF7F00', name: 'Оранжевый' },
    { color: '#FFFF01', name: 'Желтый' },
    { color: '#80FF00', name: 'Лаймовый' },
    { color: '#00FF01', name: 'Зеленый' },
    { color: '#FF0080', name: 'Розовый' },
    { color: '#FF01FF', name: 'Маджента' },
    { color: '#7F00FF', name: 'Фиолетовый' },
    { color: '#0000FE', name: 'Синий' },
    { color: '#01FFFF', name: 'Голубой' },
  ];
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--wedding-primary)', fontFamily: 'var(--font-body)' }}>
      {/* Hero Section с фото */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--wedding-primary)]">
          {/* Контейнер для фотографии с центрированием */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full md:w-[50vw] h-full overflow-hidden">
              <img
                  src={photo}
                  alt=""
                  className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--wedding-primary)]" />
      </section>
      
      {/* Main Content */}
      <div className="relative -mt-20 px-4 pb-6 " >
        <div className="max-w-4xl mx-auto">
          {/* M&D */}
          <AnimatedSection>
            <h1 
              className="text-center text-7xl md:text-9xl mb-8 md:mb-1"
              style={{ 
                fontFamily: 'var(--font-wedding)',
                color: 'var(--wedding-dark)',
                fontWeight: 300,
                letterSpacing: '0.1em'
              }}
            >
              M&D
            </h1>
          </AnimatedSection>
          
          {/* Приглашение */}
          <AnimatedSection delay={0.2}>
            <p 
              className="text-center text-lg md:text-xl mb-8 leading-relaxed px-4"
              style={{ 
                fontFamily: 'var(--font-body)',
                color: 'var(--wedding-text)'
              }}
            >
              С радостью приглашаем вас разделить с нами один из самых важных и счастливых дней нашей жизни — день нашей свадьбы!
            </p>

          {/* Декоративный элемент */}
            <div className="flex justify-center items-center gap-4 mb-14">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[var(--wedding-accent)]" />
              <Sparkles size={32} style={{ color: 'var(--wedding-accent)' }} />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[var(--wedding-accent)]" />
            </div>
          </AnimatedSection>
          
          {/* Дата и место */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl mb-8">
              <h2 
                className="text-3xl md:text-4xl text-center mb-1"
                style={{ 
                  fontFamily: 'var(--font-wedding)',
                  color: 'var(--wedding-dark)'
                }}
              >
                Торжество состоится
              </h2>
              <p 
                className="text-xl md:text-2xl text-center mb-4"
                style={{ 
                  // fontFamily: 'var(--font-wedding)',
                  color: 'var(--wedding-dark)',
                  fontWeight: 600
                }}
              >
                08.08.2026
              </p>
              <p 
                className="text-center text-base md:text-lg mb-8"
                style={{ color: 'var(--wedding-text)' }}
              >
                по адресу: Минская область, Пуховичский район, д. Заречаны, 30а
              </p>
              
              {/* Иконки */}
              <div className="flex justify-center gap-6">
                <a
                  href="https://zarechany.by/svadba-v-usadbe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:scale-110"
                  style={{ color: 'var(--wedding-dark)' }}
                >
                  <Home size={32} />
                  <span className="text-sm">Об усадьбе</span>
                </a>
                <a
                  href="https://www.google.com/maps?q=53.615481,27.579752"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:scale-110"
                  style={{ color: 'var(--wedding-dark)' }}
                >
                  <MapPin size={32} />
                  <span className="text-sm">На карте</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Описание усадьбы */}
          <AnimatedSection delay={0.2}>
            <p 
              className="text-center text-base md:text-lg mb-10 px-4 italic"
              style={{ color: 'var(--wedding-text)' }}
            >
              Экоусадьба "Заречаны" — это прекрасное место на природе, где гармонично сочетаются комфорт и атмосфера уюта
            </p>
          </AnimatedSection>
          
          {/* Программа свадьбы */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl mb-12">
              <h2 
                className="text-3xl md:text-4xl text-center mb-6"
                style={{ 
                  fontFamily: 'var(--font-wedding)',
                  color: 'var(--wedding-dark)'
                }}
              >
                Свадебная программа
              </h2>
              <p 
                className="text-center text-base md:text-lg mb-10"
                style={{ color: 'var(--wedding-text)' }}
              >
                Этот день будет наполнен любовью, теплом и радостью, и нам будет особенно приятно провести его в кругу близких и дорогих людей.
              </p>
              
              {/* День 1 */}
              <div className="mb-10">
                <h3 
                  className="text-2xl md:text-3xl mb-3 text-center"
                  style={{ 
                    fontFamily: 'var(--font-wedding)',
                    color: 'var(--wedding-dark)'
                  }}
                >
                  День 1
                </h3>
                <div className="space-y-6 relative pl-8 md:pl-12">
                  {/* Вертикальная линия */}
                  <div 
                    className="absolute left-[15px] md:left-[23px] top-2 bottom-2 w-0.5"
                    style={{ backgroundColor: 'var(--wedding-accent)' }}
                  />
                  
                  {/* Фуршет */}
                  <div className="relative">
                    <div 
                      className="absolute -left-8 md:-left-12 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--wedding-accent)' }}
                    >
                      <Wine size={16} color="white" />
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--wedding-dark)' }}>
                        Фуршет
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--wedding-text)' }}>
                        Начало праздника с приветственными напитками
                      </p>
                    </div>
                  </div>
                  
                  {/* Церемония */}
                  <div className="relative">
                    <div 
                      className="absolute -left-8 md:-left-12 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--wedding-accent)' }}
                    >
                      <Church size={16} color="white" />
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--wedding-dark)' }}>
                        Церемония
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--wedding-text)' }}>
                        Торжественная церемония бракосочетания
                      </p>
                    </div>
                  </div>
                  
                  {/* Банкет */}
                  <div className="relative">
                    <div 
                      className="absolute -left-8 md:-left-12 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--wedding-accent)' }}
                    >
                      <Music size={16} color="white" />
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--wedding-dark)' }}>
                        Праздничный банкет
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--wedding-text)' }}>
                        После церемонии вас ждет праздничный банкет и приятная атмосфера, где мы вместе отметим начало нашей семейной истории.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* День 2 */}
              <div>
                <h3 
                  className="text-2xl md:text-3xl mb-3 text-center"
                  style={{ 
                    fontFamily: 'var(--font-wedding)',
                    color: 'var(--wedding-dark)'
                  }}
                >
                  День 2
                </h3>
                <div className="space-y-6 relative pl-8 md:pl-12">
                  {/* Вертикальная линия */}
                  <div 
                    className="absolute left-[15px] md:left-[23px] top-2 bottom-2 w-0.5"
                    style={{ backgroundColor: 'var(--wedding-accent)' }}
                  />
                  
                  {/* Шашлыки */}
                  <div className="relative">
                    <div 
                      className="absolute -left-8 md:-left-12 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--wedding-accent)' }}
                    >
                      <Flame size={16} color="white" />
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--wedding-dark)' }}>
                        Свободная программа
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--wedding-text)' }}>
                        Шашлыки, веселье и отдых на природе в непринужденной атмосфере
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Таймер */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl mb-12">
              <h2 
                className="text-2xl md:text-3xl text-center mb-2"
                style={{ 
                  fontFamily: 'var(--font-wedding)',
                  color: 'var(--wedding-dark)'
                }}
              >
                До свадьбы осталось
              </h2>
              <WeddingTimer />
            </div>
          </AnimatedSection>
          
          {/* Дресс-код */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl mb-12">
              <h2 
                className="text-3xl md:text-4xl text-center mb-6"
                style={{ 
                  fontFamily: 'var(--font-wedding)',
                  color: 'var(--wedding-dark)'
                }}
              >
                Дресс-код
              </h2>
              <div className="space-y-4 mb-8 text-base md:text-lg" style={{ color: 'var(--wedding-text)' }}>
                <p>
                  Просим вас поддержать атмосферу нашего праздника и, по возможности, придерживаться дресс-кода.
                </p>
                <p>
                  Будем признательны, если вы воздержитесь от ярких оттенков в одежде. Предпочтение можно отдать спокойным, приглушённым или пастельным тонам, а также элегантным тёмным оттенкам.
                </p>
                <p>
                  Отдельно просим дам по возможности воздержаться от полностью чёрных нарядов.
                </p>
                <p className="italic">
                  Спасибо за понимание и за то, что помогаете нам сделать этот день ещё более гармоничным и красивым!
                </p>
              </div>
              
              {/* Запрещенные цвета */}
              <div>
                <p className="text-center mb-4 font-medium" style={{ color: 'var(--wedding-dark)' }}>
                  Пожалуйста, воздержитесь от этих ярких цветов:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {forbiddenColors.map((item, index) => {
                    const isDark = ['#0000FE'].includes(item.color); // добавь сюда нужные тёмные

                    return (
                        <div key={index} className="relative group">
                          <div
                              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-3 border-transparent shadow-lg relative"
                              style={{
                                backgroundColor: item.color,
                                borderColor: isDark ? 'var(--wedding-primary)' : 'var(--wedding-dark)'
                              }}
                          >
                            {/* Перечеркивание */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div
                                  className="w-full h-0.5 rotate-45 shadow-md"
                                  style={{
                                    backgroundColor: isDark ? 'var(--wedding-primary)' : 'var(--wedding-dark)'
                                  }}
                              />
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Форма опроса */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl mb-12">
              <h2 
                className="text-3xl md:text-4xl text-center mb-8"
                style={{ 
                  fontFamily: 'var(--font-wedding)',
                  color: 'var(--wedding-dark)'
                }}
              >
                Подтверждение присутствия
              </h2>
              <GuestForm />
            </div>
          </AnimatedSection>
          
          {/* Заключительный текст */}
          <AnimatedSection delay={0.4}>
            <p 
              className="text-center text-xl md:text-2xl mb-12 px-4"
              style={{ 
                fontFamily: 'var(--font-wedding)',
                color: 'var(--wedding-dark)'
              }}
            >
              С нетерпением ждем Вас отметить день рождения нашей семьи!
            </p>
          </AnimatedSection>
          
          {/* Футер */}
          <AnimatedSection delay={0.4}>
            <footer className="text-center py-4 border-t-2" style={{ borderColor: 'var(--wedding-accent)' }}>
              <div className="flex justify-center mb-4">
                <Heart size={48} style={{ color: 'var(--wedding-accent)' }} className="animate-pulse" />
              </div>
              <p 
                className="text-4xl md:text-5xl mb-2"
                style={{ 
                  fontFamily: 'var(--font-wedding)',
                  color: 'var(--wedding-dark)',
                  fontWeight: 300
                }}
              >
                Матвей & Диана
              </p>
              <p className="text-sm" style={{ color: 'var(--wedding-text)' }}>
                08.08.2026
              </p>
            </footer>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
