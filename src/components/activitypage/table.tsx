import type { User } from '@/@types/User';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { EditData } from '@/@types/EditData';
import { Error } from '@/components/error';
import { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/contextapi/global.context';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Badge } from '@/components/ui/badge';
import admin from '../../assets/admin.png';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { Domain } from '@/@types/Activity';

type Props = {
	domains: Domain[];
};

export const TableDomainsData = ({ domains }: Props) => {
	const [AnimationParent] = useAutoAnimate();
	const [open, setOpen] = useState(false);
	const [editedUser, setEditedUser] = useState<User | null>(null);

	const DataSchema = yup.object().shape({
		username: yup.string().required(),
		email: yup.string().required(),
		avatar: yup.string().required(),
		role: yup.string().required(),
	});

	const Context = useContext(AuthContext);

	const {
		control,
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<EditData>({
		resolver: yupResolver(DataSchema),
	});

	const Edit = (data: EditData) => {
		Context.editUser(editedUser!, data).then(() => {
			setOpen(false);
			reset();
		});
	};

	const deleteUser = () => {
		Context.deleteUser(editedUser!).then(() => {
			setOpen(false);
			reset();
		});
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Dominio</TableHead>
					<TableHead className="text-right pr-6">Editar</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody ref={AnimationParent}>
				{domains.map((domain: Domain, index: number) => (
					<TableRow key={index}>
						<TableCell>{domain.name}</TableCell>
						<TableCell className="text-right">
							<Button className="text-[#1b4c70] hover:text-[#2D9CDB] focus:outline-none bg-transparent hover:bg-inherit">
								Editar
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

