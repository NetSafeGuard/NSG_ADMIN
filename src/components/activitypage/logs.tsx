import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { useContext } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { Activity, ActivityLog } from '@/@types/Activity';
import { CountUp } from './countup';
import { SocketContext } from '@/contextapi/socket.context';

type Props = {
	activity: Activity;
};

type Checked = DropdownMenuCheckboxItemProps['checked'];

export const TableLogsData = ({ activity }: Props) => {
	const [AnimationParent] = useAutoAnimate();
	const [selectedLog, setSelectedLog] = React.useState<ActivityLog | null>(null);

	const { socket } = useContext(SocketContext);

	if (!socket) return null;

	const handleTextColor = (priority: string) => {
		if (priority === 'ALTA') return 'text-red-500';
		if (priority === 'MEDIA') return 'text-orange-500';
		if (priority === 'BAIXA') return 'text-green-600';
	};

	const handleBlock = (checked: Checked) => {
		if (checked) {
			socket.emit('toggleBlock', {
				activityId: activity.id,
				email: selectedLog?.user.email,
				remove: false,
			});
		} else {
			socket.emit('toggleBlock', {
				activityId: activity.id,
				email: selectedLog?.user.email,
				remove: true,
			});
		}
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Hora</TableHead>
					<TableHead>Nome</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Ação</TableHead>
					<TableHead>Informações</TableHead>
					<TableHead>Prioridade</TableHead>
					<TableHead className="text-right pr-6">Opções</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody ref={AnimationParent}>
				{activity.logs.map((log: ActivityLog, index: number) => (
					<TableRow key={index}>
						<TableCell className="w-32 text-nowrap whitespace-nowrap">
							<CountUp startDate={log.createdAt} />
						</TableCell>
						<TableCell className="text-left text-nowrap whitespace-nowrap">{log.user.name}</TableCell>
						<TableCell className="text-left text-nowrap whitespace-nowrap">{log.user.email}</TableCell>
						<TableCell className="text-nowrap whitespace-nowrap">{log.action}</TableCell>
						<TableCell>{log.info}</TableCell>
						<TableCell className={handleTextColor(log.priority)}>
							{log.priority}
						</TableCell>
						<TableCell className="text-center pr-6 cursor-pointer">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<span onClick={() => setSelectedLog(log)}>...</span>
								</DropdownMenuTrigger>
								{log === selectedLog && (
									<DropdownMenuContent className="w-56">
										<DropdownMenuLabel>Ações</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem
											checked={
												activity.blockedUsers.some(
													user => user.email === log.user.email,
												) as Checked
											}
											onCheckedChange={handleBlock}>
											{activity.blockedUsers.some(
												user => user.email === log.user.email,
											)
												? 'Desbloquear'
												: 'Bloquear'}
										</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
								)}
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
