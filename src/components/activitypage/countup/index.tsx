import type React from 'react';
import { useState, useEffect } from 'react';
import * as C from './style';

interface CountdownProps {
	startDate: Date;
}

export const CountUp: React.FC<CountdownProps> = ({ startDate }) => {
	const calculateTimeUp = (): string => {
		const now = new Date();

		const diff = now.getTime() - startDate.getTime();

		const hours = Math.floor(diff / 1000 / 60 / 60);
		const minutes = Math.floor((diff / 1000 / 60) % 60);
		const seconds = Math.floor((diff / 1000) % 60);
		
		if (hours > 0) return `Há ${hours} hora${hours === 1 ? ' ' : 's'}`;
		if (minutes > 0) return `Há ${minutes} minuto${minutes === 1 ? ' ' : 's'}`;
		if (seconds > 0) return `Há ${seconds} segundo${seconds === 1 ? ' ' : 's'}`;

		return 'Agora';

	};

	const [timeLeft, setTimeLeft] = useState<string>(calculateTimeUp());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeUp());
		}, 1000);

		return () => clearInterval(timer);
	}, [startDate]);

	return <C.Date>{timeLeft}</C.Date>;
};
