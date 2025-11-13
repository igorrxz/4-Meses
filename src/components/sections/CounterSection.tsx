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

      if (diff < 0) {
        setTimeLeft({
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      
      // Calculate months more accurately
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();
      const nowYear = now.getFullYear();
      const nowMonth = now.getMonth();
      
      let months = (nowYear - startYear) * 12 + (nowMonth - startMonth);
      
      // Adjust if we haven't reached the day of the month yet
      if (now.getDate() < startDate.getDate()) {
        months--;
      }
      
      // Calculate remaining days in current month
      const lastMonthDate = new Date(nowYear, nowMonth, startDate.getDate());
      if (now.getDate() < startDate.getDate()) {
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      }
      const daysDiff = Math.floor((now.getTime() - lastMonthDate.getTime()) / (1000 * 60 * 60 * 24));

      setTimeLeft({
        months: months,
        days: daysDiff,
        hours: totalHours % 24,
        minutes: totalMinutes % 60,
        seconds: totalSeconds % 60,
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
        <h2 className="heading-lg text-foreground mb-4 relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
            Estamos Juntos Há
          </span>
          <span className="absolute inset-0 blur-xl bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 animate-aurora" />
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