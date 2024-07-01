import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { useContext } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { ActivityLog } from '@/@types/Activity';
import { ActivitiesContext } from '@/contextapi/activities.context';
import { CountUp } from './countup';

type Props = {
	logs: ActivityLog[];
};

export const TableLogsData = ({ logs }: Props) => {
	const [AnimationParent] = useAutoAnimate();


	const handleTextColor = (priority: string) => {
		if (priority === 'ALTA') return 'text-red-500';
		if (priority === 'MEDIA') return 'text-orange-500';
		if (priority === 'BAIXA') return 'text-green-600';
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Hora</TableHead>
					<TableHead>Nome</TableHead>
					<TableHead>Ação</TableHead>
					<TableHead>Informações</TableHead>
					<TableHead>Prioridade</TableHead>
					<TableHead className="text-right pr-6">Opções</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody ref={AnimationParent}>
				{logs.map((log: ActivityLog, index: number) => (
					<TableRow key={index}>
						<TableCell className="w-32">
							<CountUp startDate={log.createdAt} />
						</TableCell>
						<TableCell className='text-left'>
							{log.user.name}
						</TableCell>
						<TableCell>
							{log.action}
						</TableCell>
						<TableCell>
							{log.info}
						</TableCell>
						<TableCell className={handleTextColor(log.priority)}>
							{log.priority}
						</TableCell>
						<TableHead
							className="text-center pr-6 cursor-pointer">
							...
						</TableHead>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
