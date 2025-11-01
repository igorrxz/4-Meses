import { useState, useEffect } from 'react';

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CounterSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = new Date('2025-07-13T00:00:00');
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);

      setTimeLeft({
        months,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { value: timeLeft.months, label: 'Meses' },
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-baby-blue/10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="heading-lg text-foreground mb-4">
          Estamos Juntos Há
        </h2>
        <p className="body-md text-muted-foreground mb-12">
          Desde 13 de Julho de 2025
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 md:p-8 animate-pulse-glow"
            >
              <div className="heading-lg text-primary mb-2">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="body-md text-muted-foreground">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}