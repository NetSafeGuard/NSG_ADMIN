import type React from 'react';
import { useState, useEffect } from 'react';
import * as C from './style';

interface CountdownProps {
	startDate: Date;
    endDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ startDate, endDate }) => {
	const calculateTimeLeft = (): string => {
		const now = new Date();
		const difference = startDate.getTime() - now.getTime();

		if (difference <= 0) {
			const endDifference = endDate.getTime() - now.getTime();
            if (endDifference <= 0) return 'Encerrado';
            let seconds = Math.floor(endDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            seconds %= 60;
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);
            const months = Math.floor(weeks / 4);

            if (months > 0) return `Encerra em ${months} mês${months === 1 ? '' : 'es'}`;
            if (weeks > 0) return `Encerra em ${weeks} semana${weeks === 1 ? '' : 's'}`;
            if (days > 0) return `Encerra em ${days} dia${days === 1 ? '' : 's'}`;
            if (hours > 0) return `Encerra em ${hours} hora${hours === 1 ? '' : 's'}`;
            if (remainingMinutes > 0)
                return `Encerra em ${remainingMinutes} minuto${remainingMinutes === 1 ? '' : 's'}`;
                return `Encerra em ${seconds} segundo${seconds === 1 ? '' : 's'}`;
		}

		let seconds = Math.floor(difference / 1000);
		const minutes = Math.floor(seconds / 60);
		seconds %= 60;
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(weeks / 4);

		if (months > 0) return `Começa em ${months} mês${months === 1 ? '' : 'es'}`;
		if (weeks > 0) return `Começa em ${weeks} semana${weeks === 1 ? '' : 's'}`;
		if (days > 0) return `Começa em ${days} dia${days === 1 ? '' : 's'}`;
		if (hours > 0) return `Começa em ${hours} hora${hours === 1 ? '' : 's'}`;
		if (remainingMinutes > 0)
			return `Começa em ${remainingMinutes} minuto${remainingMinutes === 1 ? '' : 's'}`;
			return `Começa em ${seconds} segundo${seconds === 1 ? '' : 's'}`;
	};

	const [timeLeft, setTimeLeft] = useState<string>(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [startDate, endDate]);

	return <C.Date>{timeLeft}</C.Date>;
};

export default Countdown;
